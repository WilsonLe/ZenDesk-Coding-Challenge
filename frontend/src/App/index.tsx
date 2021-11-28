import React, { FC } from 'react';
import { useTickets } from './useTickets';
interface Props {}

/**
 * Main App component
 */
const App: FC<Props> = () => {
  const { tickets, errorMessage } = useTickets();
  return (
    <>
      {tickets ? (
        tickets.map((ticket) => <div key={ticket.id}>{ticket.id}</div>)
      ) : (
        <div>LOADING...</div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default App;
