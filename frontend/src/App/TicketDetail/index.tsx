import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FirebaseError } from '@firebase/app';
import { useTicket } from './useTicket';
import Alert from '../Alert';
import Loading from '../Loading';
import Detail from './Detail';
import { useNetwork } from '../useNetwork';

interface Props {}

const TicketDetail: FC<Props> = () => {
  const [error, setError] = useState<Error | FirebaseError | undefined>();
  const [loading, setLoading] = useState<string | undefined>('LOADING...');
  const { ticketId } = useParams();
  // since ticketId cannot be undefined (router made sure of that), input to useTicket empty string if ticketId is undefined
  const { ticket } = useTicket(ticketId ? ticketId : '', error, setError);

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

  useEffect(() => {
    setLoading(ticket ? undefined : 'Fetching...');
  }, [ticket]);

  return (
    <>
      <div className="w-full border border-gray-200 bg-white shadow-md fixed top-0 z-10 flex flex-row justify-center items-center">
        <div className="max-w-4xl w-full flex flex-row justify-between items-center">
          <h3 className="w-full px-4 py-5 text-xl leading-6 font-bold text-gray-900">
            Ticket Detail
          </h3>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
          >
            <Link to="/">Back</Link>
          </button>
        </div>
      </div>

      {ticket && (
        <div className="w-full flex flex-row justify-center items-center absolute top-20">
          <div className="max-w-4xl w-full sm:border sm:border-gray-200 sm:rounded-md">
            <Detail ticket={ticket} />
          </div>
        </div>
      )}
      {error && (
        <Alert error={error} setError={setError} setLoading={setLoading} />
      )}
      {loading && <Loading loading={loading} />}
    </>
  );
};

export default TicketDetail;
