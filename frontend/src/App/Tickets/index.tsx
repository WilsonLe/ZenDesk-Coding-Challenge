import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TicketData, TicketMeta } from '../../types';
import { FirebaseError } from '@firebase/app';
import Pagination from '../Pagination';
import Ticket from './Ticket';
import Loading from '../Loading';

interface Props {
  setTickets: React.Dispatch<React.SetStateAction<TicketData[] | undefined>>;
  tickets: TicketData[];
  setError: React.Dispatch<
    React.SetStateAction<Error | FirebaseError | undefined>
  >;
  count: number;
  meta: TicketMeta | undefined;
  setMeta: React.Dispatch<React.SetStateAction<TicketMeta | undefined>>;
}

const Tickets: FC<Props> = ({
  setTickets,
  tickets,
  setError,
  count,
  meta,
  setMeta,
}) => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  useEffect(() => {
    setIsLoadingPage(tickets ? false : true);
  }, [tickets]);
  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {isLoadingPage ? (
          <Loading />
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <Link key={ticket.id} to={`/${ticket.id}`}>
                <Ticket ticket={ticket} />
              </Link>
            ))}
          </ul>
        )}
        <Pagination
          count={count}
          perPage={10}
          meta={meta}
          setMeta={setMeta}
          setTickets={setTickets}
          setError={setError}
          setIsLoadingPage={setIsLoadingPage}
        />
      </div>
    </>
  );
};

export default Tickets;
