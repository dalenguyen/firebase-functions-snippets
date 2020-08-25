# Deploy Fibase Through Cloud Build

Deploy firebase hosting or cloud functions through Google Cloud Build.

```
### cloudbuid.yaml

steps:
  # Step 1
  - name: node:10
    entrypoint: yarn
    args:
      - 'install'

  # Step 2
  - name: node:10
    entrypoint: yarn
    args:
      - build

  # Step 3
  - name: 'gcr.io/cloud-builders/gcloud'
    entrypoint: /bin/bash
    args: ['-c', 'gcloud auth application-default print-access-token > FIREBASE_TOKEN']

  # Step 4
  - name: 'node:10'
    entrypoint: yarn
    args:
      - deploy

timeout: 1200s # 20min

```
