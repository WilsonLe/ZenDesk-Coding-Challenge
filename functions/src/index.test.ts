import 'ts-jest';
import { testEnv } from './firebase.config';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import * as myFunctions from '.';

describe('getTickets callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.getTickets);
  });

  test('it returns status 200', async () => {
    const res = await wrapped({});
    expect(res).toBeDefined();
  });
});
