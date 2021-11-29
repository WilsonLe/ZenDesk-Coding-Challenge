import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseError } from '@firebase/app';
import { useTicket } from './useTicket';
import Alert from '../Alert';
import Loading from '../Loading';
import Detail from './Detail';
import { useNetwork } from '../useNetwork';
interface Props {}

const TicketDetail: FC<Props> = () => {
  const [error, setError] = useState<Error | FirebaseError | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(ticket ? false : true);
  }, [ticket]);

  return (
    <>
      <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center overflow-hidden">
        {ticket && <Detail ticket={ticket} />}
        <Alert error={error} setError={setError} />
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default TicketDetail;
