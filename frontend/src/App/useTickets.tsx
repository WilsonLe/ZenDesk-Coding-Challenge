import { useEffect, useState } from 'react';
import { FirebaseError } from '@firebase/app';
import { TicketData } from '../types';
import { getTickets } from './getTickets';

/**
 * custom hook to get tickets, states of errors (if any) while fetching tickets from server
 */
const useTickets = () => {
  const [tickets, setTickets] = useState<TicketData[] | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  useEffect(() => {
    let isSubscribe = true;
    (async () => {
      try {
        const tickets = await getTickets();
        isSubscribe && setTickets(tickets);
        setTickets(tickets);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setErrorMessage(error.message);
        } else {
          console.log(error);
        }
      }
    })();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return { tickets, setTickets, errorMessage, setErrorMessage };
};
export { useTickets };
