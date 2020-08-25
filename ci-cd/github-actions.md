# Deploy Firebase Via Github Actions

Deploy firebase hosting or cloud functions via Github Actions.

Get the Firebase token by running `firebase login:ci` and store it as the `FIREBASE_TOKEN` secret.

```
# .github/workflows/dev.yml

name: Push to Dev Branch

on:
  push:
    branches:
      - dev

jobs:
  deploy-function:
    name: Build and Deploy functions to Dev
    runs-on: ubuntu-latest
    env:
      FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

    steps:
      - name: Checkout Repo
        uses: actions/checkout@v2
        with:
          ref: dev

      - name: Install Firebase CLI
        run: sudo npm install -g firebase-tools

      - name: Install Dependencies
        working-directory: functions
        run: sudo npm install

      - name: Build dev
        working-directory: functions
        run: sudo npm run build

      - name: Deploy to dev
        working-directory: functions
        run: sudo firebase deploy --only functions --token $FIREBASE_TOKEN
```
