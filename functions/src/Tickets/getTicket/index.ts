import * as functions from 'firebase-functions';
import axios from 'axios';
import { GetTicketResData, TicketData } from '../../types';
import secrets from '../../secrets.json';

const getTicketHandler: (data: {
  ticketId: string;
}) => Promise<{ ticket: TicketData }> = async (data) => {
  const { ticketId } = data;
  try {
    const ticketRes = await axios.get(
      `https://zccwilsonle.zendesk.com/api/v2/tickets/${ticketId}`,
      {
        auth: {
          username: secrets.email || '',
          password: secrets.password || '',
        },
      }
    );
    const ticketResData: GetTicketResData = ticketRes.data;

    return { ticket: ticketResData.ticket };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Something went wrong with our server. Please try again later',
      error
    );
  }
};

export default getTicketHandler;
