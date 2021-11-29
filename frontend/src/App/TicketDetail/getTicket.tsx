import { httpsCallable } from '@firebase/functions';
import { fn } from '../../firebase.config';
import { TicketData } from '../../types';
import { FirebaseError } from '@firebase/app';
/**
 * get ticket data from sv by invoking httpsCallable function and return the reponse data
 */
const getTicket: (ticketId: string) => Promise<{ ticket: TicketData }> = async (
  ticketId
) => {
  const data = { ticketId };
  try {
    const res = await httpsCallable<typeof data, { ticket: TicketData }>(
      fn,
      'getTicket'
    )(data);
    return res.data;
  } catch (error) {
    throw error as FirebaseError;
  }
};
export { getTicket };
