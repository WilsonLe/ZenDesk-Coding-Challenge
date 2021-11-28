import { useEffect, useState } from 'react';
import { FirebaseError } from '@firebase/app';
import { TicketData } from '../types';
import { getTickets } from './getTickets';

/**
 * custom hook to get tickets, states of errors (if any) while fetching tickets from server
 */
const useTickets: () => {
  tickets: TicketData[] | undefined;
  setTickets: React.Dispatch<React.SetStateAction<TicketData[] | undefined>>;
  errorMessage: string | undefined;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
} = () => {
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
          setErrorMessage('Unexpected error has occured');
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
