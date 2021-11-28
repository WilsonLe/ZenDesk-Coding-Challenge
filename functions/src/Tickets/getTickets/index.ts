import * as functions from 'firebase-functions';
import axios from 'axios';
import { GetTicketsResData, TicketData } from '../../types';
import secrets from '../../secrets.json';

const getTicketsHandler = async (): Promise<{ tickets: TicketData[] }> => {
  try {
    const res = await axios.get(
      'https://zccwilsonle.zendesk.com/api/v2/tickets?page[size]=25',
      {
        auth: {
          username: secrets.email || '',
          password: secrets.password || '',
        },
      }
    );
    const data: GetTicketsResData = res.data;
    const tickets = data.tickets;
    return { tickets };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Something went wrong with our server. Please try again later',
      error
    );
  }
};

export default getTicketsHandler;
