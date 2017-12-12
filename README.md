# Assignment 2 - Automated development process.

Name: Joe Wemyss

Student No.:  20068336

## Overview.

This application is a Progressive Web Application that functions in a "serverless" fashion. It communicates directly with
 a database from the client. The application is built using [VueJS](https://vuejs.org), with firebase and Google Cloud Platform as a backend.
## Environment.

This project requires NodeJS to be installed. I built it using Node 8.6.0, and NPM 5.3.0, but any version greater than 4.0.0 should work. There is no need for any database software to be installed, however, you will need a `.env` file located in the root of the project directory that contains the following env variables;

```
  FIREBASE_API_KEY=<your value>
  FIREBASE_AUTH_DOMAIN=<your value>
  FIREBASE_DATABASE_URL=<your value>
  FIREBASE_PROJECT_ID=<your value>
  FIREBASE_STORAGE_BUCKET=<your value>
  FIREBASE_MESSAGING_SENDER_ID=<your value>
  BACKEND_BASE_URL=<your value>
  MAPS_API_KEY=<your value>
  LOG_LEVEL=trace
  COVERALLS_REPO_TOKEN=<your value>
``` 

## Build automation.

To build the application for development, with Live Reload and HotModuleReplacement(HMR), run `npm run dev`.

To build the application for production, run `npm run build`. This will build the application in a production ready format, with full minification, a production-ready Service Worker and compressed images.

To run the full test suite, you can run `npm test`. This will run the full unit test suite, as well as the acceptance tests. 
## Acceptance Testing.

. . . For each view of the app that has an associated acceptance test, show: (1) a screenshot of the web page (2) specify the pathname of the test file and (3) list the output from the test execution.

## Continuous Integration.

The URL for the travis project can be found [here](https://travis-ci.org/JavaTheNutt/web_app_dev_project_frontend_02). In order to build this application yourself, you will need to create a firebase account, copy the keys to a `.env` file located at the project root for development, and also copy the keys to the Travis environment variables. You will also need to create a Facebook developer account, and link copy your client secret key to your firebase project. As Firebase is a subsidiary of Google, there is no need to obtain a Google client secret key for Google OAuth.

## Automated Deployment.

The hosted application can be found [here](https://finance-tracker-1cc05.firebaseapp.com/). In order to facilitate automated deployment, the steps outliend in the travis step above will need to be completed

## Extra features.

. . . . Briefly state any extra aspects of your automation process that you feel should be high-lighted . . . . .
