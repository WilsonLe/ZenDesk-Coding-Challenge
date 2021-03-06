import * as functions from 'firebase-functions';
import getTicketsHandler from './Tickets/getTickets';
import getTicketHandler from './Tickets/getTicket';

export const getTickets = functions.https.onCall(getTicketsHandler);
export const getTicket = functions.https.onCall(getTicketHandler);
