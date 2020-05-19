// https://firebase.google.com/docs/functions/schedule-functions

import { RuntimeOptions, runWith, EventContext } from 'firebase-functions'

const runtimeOpts: RuntimeOptions = {
  memory: '256MB',
  timeoutSeconds: 540, // max timeout
}

const catchErrorOnRun = (handler: (context) => Promise<void>) => async (
  context: EventContext
): Promise<void> => {
  try {
    await handler(context)
  } catch (error) {
    console.error(error)
  }
}

export const handleSchedule = async () => {
  console.log('Schedule functions is running')
  return
}

// Function will run every 60 minutes
export const scheduleFunction = runWith(runtimeOpts)
  .pubsub.schedule('every 60 minutes')
  .onRun(catchErrorOnRun(handleSchedule))
