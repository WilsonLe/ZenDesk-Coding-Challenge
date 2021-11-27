import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
type URL = string;
type TicketData = {
  url: URL;
  id: number;
  external_id: null;
  via: any; // unclear typings
  created_at: string;
  updated_at: string;
  type: null;
  subject: string;
  raw_subject: string;
  description: string;
  priority: null;
  status: 'open' | 'close';
  recipient: null;
  requester_id: number;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  group_id: number;
  collaborator_ids: string[];
  follower_ids: string[];
  email_cc_ids: string[];
  forum_topic_id: null;
  problem_id: null;
  has_incidents: boolean;
  is_public: boolean;
  due_at: string | null;
  tags: string[];
  custom_fields: string[];
  satisfaction_rating: null;
  sharing_agreement_ids: string[];
  followup_ids: string[];
  ticket_form_id: number;
  brand_id: number;
  allow_channelback: boolean;
  allow_attachments: boolean;
};
type GetTicketsData = {
  tickets: TicketData[];
  meta: {
    has_more: boolean;
    after_cursor: string;
    before_cursor: string;
  };
  links: {
    prev: URL;
    next: URL;
  };
};
(async () => {
  try {
    const res = await axios.get(
      'https://zccwilsonle.zendesk.com/api/v2/tickets?page[size]=25',
      {
        auth: {
          username: process.env.EMAIL || '',
          password: process.env.PASSWORD || '',
        },
      }
    );
    const data: GetTicketsData = res.data;
    const tickets = data.tickets;
    console.log(tickets[0]);
  } catch (error) {
    console.log(error);
  }
})();
