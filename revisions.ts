// A new revision is created on every update under revision collection

import { DeepDiff } from 'deep-diff'
import {
  Change,
  EventContext,
  runWith,
  RuntimeOptions,
} from 'firebase-functions'
import { DocumentSnapshot } from '@google-cloud/firestore'

export interface RevisionChange {
  kind: string
  path: string
  lhs: any
  rhs: any
}
export interface Revision {
  changes: RevisionChange[]
  createdAt: string
}

export const handleOnUpdateEvent = async (
  documentSnapshot: Change<FirebaseFirestore.DocumentSnapshot>,
  context: EventContext
) => {
  const previousSnapshot = documentSnapshot.before
  const updatedSnapshot = documentSnapshot.after

  const revision = createNewRevision(previousSnapshot, updatedSnapshot)

  await addRevision(updatedSnapshot, revision)
}

export const createNewRevision = <T>(
  previousDocument: DocumentSnapshot,
  updatedDocument: DocumentSnapshot
): Revision => {
  const previousEntity = previousDocument.data() as T
  const updatedEntity = updatedDocument.data() as T

  return createRevision(previousEntity, updatedEntity)
}

export const addRevision = async (
  document: DocumentSnapshot,
  revision: Revision
) => {
  return document.ref.collection(`revisions`).doc().set(revision)
}

export const createRevision = (obj1: any, obj2: any): Revision => {
  const changes: any[] = []

  const differences: any[] = DeepDiff.diff(obj1, obj2)
  differences.forEach(difference => {
    let change = {
      kind: difference.kind,
      path: difference.path.join('.'),
      lhs: difference.lhs,
      rhs: difference.rhs,
    }
    change = JSON.parse(JSON.stringify(change))
    changes.push(change)
  })

  const revision: Revision = {
    createdAt: new Date().toISOString(),
    changes: changes,
  }
  return revision
}

const runtimeOpts: RuntimeOptions = {
  memory: '256MB',
  timeoutSeconds: 540, // max timeout
}

// This is how we create a function that listen to
// User changes and create a revision
export const createRevisions = runWith(runtimeOpts)
  .firestore.document(`user/{userId}`)
  .onUpdate(handleOnUpdateEvent)
