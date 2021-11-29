import functionsTest from 'firebase-functions-test';
const testEnv = functionsTest(
  {
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    projectId: process.env.PROJECT_ID,
  },
  './secrets.json'
);

export { testEnv };
