import 'ts-jest';
import { testEnv } from './firebase.config';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import * as myFunctions from '.';

describe('getTickets callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.getTickets);
  });

  it('returns status 200', async () => {
    const data = await wrapped({ url: undefined });
    expect(data).toBeDefined();
  });
  it('returns correct data', async () => {
    const data = await wrapped({ url: undefined });
    expect(data.tickets).toBeDefined();
    expect(data.tickets).toHaveLength(10);
    expect(data.count).toBeDefined();
    expect(data.count).toBe(101);
    expect(data.meta).toBeDefined();
  });
});

describe('getTicket callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.getTicket);
  });

  it('returns status 200', async () => {
    const data = await wrapped({ ticketId: '2' });
    expect(data).toBeDefined();
  });
  it('returns correct data', async () => {
    const data = await wrapped({ ticketId: '2' });
    expect(data.ticket).toBeDefined();
  });
});
