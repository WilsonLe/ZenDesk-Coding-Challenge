import { httpsCallable } from '@firebase/functions';
import { fn } from '../firebase.config';
import { TicketData, TicketMeta, URL } from '../types';
import { FirebaseError } from '@firebase/app';
/**
 * get ticket data from sv by invoking httpsCallable function and return the reponse data
 */
const getTickets: (url?: URL | undefined) => Promise<{
  tickets: TicketData[];
  count: number;
  meta: TicketMeta;
}> = async (url) => {
  try {
    const data = { url };
    const res = await httpsCallable<
      typeof data,
      { tickets: TicketData[]; count: number; meta: TicketMeta }
    >(
      fn,
      'getTickets'
    )(data);
    return {
      tickets: res.data.tickets,
      count: res.data.count,
      meta: res.data.meta,
    };
  } catch (error) {
    throw error as FirebaseError;
  }
};
export { getTickets };
