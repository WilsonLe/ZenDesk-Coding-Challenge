import * as functions from 'firebase-functions';
import getTicketsHandler from './Tickets/getTickets';

export const getTickets = functions.https.onCall(getTicketsHandler);
