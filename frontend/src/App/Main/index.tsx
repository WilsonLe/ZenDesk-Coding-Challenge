import React, { FC, useEffect, useState } from 'react';
import Alert from '../Alert';
import Loading from '../Loading';
import Tickets from '../Tickets';
import { FirebaseError } from '@firebase/app';
import { useTickets } from './useTickets';
import { useNetwork } from '../useNetwork';
interface Props {}

/**
 * Main App component
 */
const Main: FC<Props> = () => {
  const [error, setError] = useState<Error | FirebaseError | undefined>();
  const isOnline = useNetwork();
  useEffect(() => {
    if (!isOnline) {
      setError(
        new Error('It looks like you have gone offline, please try again later')
      );
    }
    if (isOnline) {
      setError(undefined);
    }
  }, [isOnline]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { tickets, setTickets, count, meta, setMeta } = useTickets(
    error,
    setError
  );

  useEffect(() => {
    setIsLoading(tickets ? false : true);
  }, [tickets]);

  return (
    <>
      <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center overflow-hidden">
        <div className="px-4 py-5 border-b sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Tickets
          </h3>
        </div>
        {tickets && count && (
          <div className="max-w-4xl sm:mx-6 lg:mx-8 h-3/4 overflow-scroll border border-gray-200 rounded-md">
            <Tickets
              setTickets={setTickets}
              tickets={tickets}
              setError={setError}
              count={count}
              meta={meta}
              setMeta={setMeta}
            />
          </div>
        )}
        <Alert error={error} setError={setError} />
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default Main;
