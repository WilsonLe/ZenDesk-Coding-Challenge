import React, { FC, useEffect, useState } from 'react';
import Alert from '../Alert';
import Loading from '../Loading';
import Tickets from '../Tickets';
import { FirebaseError } from '@firebase/app';
import { useTickets } from './useTickets';
import { useNetwork } from '../useNetwork';
import Pagination from '../Pagination';
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
  const [loading, setLoading] = useState<string | undefined>();

  const { tickets, setTickets, count, meta, setMeta } = useTickets(
    error,
    setError
  );

  useEffect(() => {
    setLoading(tickets ? undefined : 'Fetching...');
  }, [tickets]);

  return (
    <>
      <div className="overflow-y-scroll">
        <div className="border border-gray-200 bg-white shadow-md fixed top-0 left-0 z-10 w-full flex flex-row justify-center items-center">
          <h3 className="max-w-4xl w-full px-4 py-5 text-xl leading-6 font-bold text-gray-900">
            Tickets
          </h3>
        </div>
        {tickets && count && (
          <div className="w-full flex flex-row justify-center items-center">
            <div className="max-w-4xl w-full absolute top-20 sm:border sm:border-gray-300 sm:rounded-md">
              {!loading && (
                <div className="pb-20">
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
              <div className="w-full m-0 fixed bottom-0 left-0 h-20 bg-white z-10 border-t border-gray-200 flex flex-row justify-center items-center">
                <Pagination
                  count={count}
                  perPage={25}
                  meta={meta}
                  setMeta={setMeta}
                  setTickets={setTickets}
                  setError={setError}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        )}
        {loading && <Loading loading={loading} />}
        {error && (
          <Alert error={error} setError={setError} setLoading={setLoading} />
        )}
      </div>
    </>
  );
};

export default Main;
