import * as functions from 'firebase-functions';
import axios from 'axios';
import { GetTicketsResData, TicketData, TicketMeta, URL } from '../../types';
import secrets from '../../secrets.json';
import { LengthResData } from '../../types/TicketData';

const getTicketsHandler: (data?: { url: URL | undefined }) => Promise<{
  tickets: TicketData[];
  count: number;
  meta: TicketMeta;
}> = async (data) => {
  const url = data?.url;
  try {
    const ticketRes = await axios.get(
      url
        ? url
        : 'https://zccwilsonle.zendesk.com/api/v2/tickets?page[size]=25',
      {
        auth: {
          username: secrets.email || '',
          password: secrets.password || '',
        },
      }
    );
    const ticketResData: GetTicketsResData = ticketRes.data;

    const lengthRes = await axios.get(
      'https://zccwilsonle.zendesk.com/api/v2/tickets/count',
      {
        auth: {
          username: secrets.email || '',
          password: secrets.password || '',
        },
      }
    );
    const lengthResData: LengthResData = lengthRes.data;

    return {
      tickets: ticketResData.tickets,
      count: lengthResData.count.value,
      meta: {
        has_more: ticketResData.meta.has_more,
        prev: ticketResData.links.prev,
        next: ticketResData.links.next,
      },
    };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Something went wrong with our server. Please try again later',
      error
    );
  }
};

export default getTicketsHandler;
