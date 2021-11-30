import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TicketData, TicketMeta } from '../../types';
import { FirebaseError } from '@firebase/app';
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

const Tickets: FC<Props> = ({ tickets }) => {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <Link key={ticket.id} to={`/${ticket.id}`}>
            <Ticket ticket={ticket} />
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Tickets;
