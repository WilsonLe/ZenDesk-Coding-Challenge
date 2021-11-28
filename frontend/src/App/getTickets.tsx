import { httpsCallable } from '@firebase/functions';
import { fn } from '../firebase.config';
import { TicketData } from '../types';

/**
 * get ticket data from sv by invoking httpsCallable function and return the reponse data
 */
const getTickets = async () => {
  const res = await httpsCallable<null, { tickets: TicketData[] }>(
    fn,
    'getTickets'
  )();
  return res.data.tickets;
};
export { getTickets };
