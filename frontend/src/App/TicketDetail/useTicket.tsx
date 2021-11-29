import React, { useEffect, useState } from 'react';
import { TicketData } from '../../types';
import { getTicket } from './getTicket';
import { FirebaseError } from '@firebase/app';
/**
 * fetch ticket data from input ticketId, return ticket data
 */
const useTicket: (
  ticketId: string,
  error: Error | FirebaseError | undefined,
  setError: React.Dispatch<
    React.SetStateAction<Error | FirebaseError | undefined>
  >
) => { ticket: TicketData | undefined } = (ticketId, setError) => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  useEffect(() => {
    let isSubscribe = true;
    (async () => {
      try {
        const { ticket } = await getTicket(ticketId);
        isSubscribe && setTicket(ticket);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError;
        }
      }
    })();
    return () => {
      isSubscribe = false;
    };
  }, [ticketId]);
  return { ticket };
};

export { useTicket };
