import 'ts-jest';
import { testEnv } from './firebase.config';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import * as myFunctions from '.';

describe('hello world callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.helloWorld);
  });
  test('it returns "HELLO WORLD"', async () => {
    const res = await wrapped({});
    expect(res).toBe('HELLO WORLD');
  });
});
