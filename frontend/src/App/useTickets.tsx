import { useEffect, useState } from 'react';
import { FirebaseError } from '@firebase/app';
import { TicketData, TicketMeta, URL } from '../types';
import { getTickets } from './getTickets';

/**
 * custom hook to get tickets, states of errors (if any) while fetching tickets from server. input can be left undefined when fetching tickets the first time. After initial fetch, input meta next or prev urls
 */
const useTickets: (
  error: Error | FirebaseError | undefined,
  setError: React.Dispatch<
    React.SetStateAction<Error | FirebaseError | undefined>
  >,
  url?: URL | undefined
) => {
  tickets: TicketData[] | undefined;
  setTickets: React.Dispatch<React.SetStateAction<TicketData[] | undefined>>;

  count: number | undefined;
  setCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  meta: TicketMeta | undefined;
  setMeta: React.Dispatch<React.SetStateAction<TicketMeta | undefined>>;
} = (error, setError, url) => {
  const [tickets, setTickets] = useState<TicketData[] | undefined>(undefined);
  const [newMeta, setNewMeta] = useState<TicketMeta | undefined>();

  const [count, setCount] = useState<number | undefined>();
  useEffect(() => {
    let isSubscribe = true;
    (async () => {
      // undefined meta: initial fetch
      try {
        const { tickets, count, meta } = await getTickets(url);
        isSubscribe && setTickets(tickets);
        isSubscribe && setCount(count);
        isSubscribe && setNewMeta(meta);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError(error);
        } else {
          setError(new Error('Unexpected error has occured'));
        }
      }
    })();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return {
    tickets,
    setTickets,
    error,
    setError,
    count,
    setCount,
    meta: newMeta,
    setMeta: setNewMeta,
  };
};
export { useTickets };
