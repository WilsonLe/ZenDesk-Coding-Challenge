import React, { FC } from 'react';
import { TicketData, TicketMeta } from '../../types';
import { FirebaseError } from '@firebase/app';
import Pagination from '../Pagination';
import Ticket from './Ticket';

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
  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </ul>
        <Pagination
          count={count}
          perPage={10}
          meta={meta}
          setMeta={setMeta}
          setTickets={setTickets}
          setError={setError}
        />
      </div>
    </>
  );
};

export default Tickets;
