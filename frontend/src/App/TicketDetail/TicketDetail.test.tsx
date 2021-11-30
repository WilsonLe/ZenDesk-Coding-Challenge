import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { TicketDataWithFields } from '../../types';
import { getTicket } from './getTicket';
import TicketDetail from '.';

const ticket: TicketDataWithFields = {
  url: 'https://zccwilsonle.zendesk.com/api/v2/tickets/10.json',
  id: 10,
  external_id: null,
  via: {
    channel: 'api',
    source: {
      from: {},
      to: {},
      rel: null,
    },
  },
  created_at: '2021-11-27T04:48:01Z',
  updated_at: '2021-11-27T04:48:01Z',
  type: null,
  subject: 'magna reprehenderit nisi est cillum',
  raw_subject: 'magna reprehenderit nisi est cillum',
  description:
    'Sit sit consequat magna aliquip officia qui. Fugiat amet id dolor sint exercitation sit. Eiusmod ex eiusmod voluptate voluptate est amet non culpa minim enim minim. Eiusmod fugiat veniam duis eiusmod sint laborum ex amet occaecat.\n\nNostrud consequat officia tempor amet eu. Non adipisicing dolore amet minim id consequat labore irure in esse et aliqua pariatur. Aliquip aliqua id ipsum amet laboris exercitation sunt cillum est et est. Tempor amet qui do dolore fugiat ad id nulla ullamco dolore tempor irure deserunt magna. Ipsum voluptate aliquip ut ad in pariatur adipisicing occaecat ea excepteur Lorem enim exercitation. Lorem sunt officia voluptate pariatur labore esse nostrud ullamco irure sit. Voluptate exercitation do aliquip eu consectetur.',
  priority: null,
  status: 'open',
  recipient: null,
  requester_id: 1267134484389,
  submitter_id: 1267134484389,
  assignee_id: 1267134484389,
  organization_id: 1260919509610,
  group_id: 4411261745691,
  collaborator_ids: [],
  follower_ids: [],
  email_cc_ids: [],
  forum_topic_id: null,
  problem_id: null,
  has_incidents: false,
  is_public: true,
  due_at: null,
  tags: ['aliquip', 'magna', 'non'],
  custom_fields: [],
  satisfaction_rating: null,
  sharing_agreement_ids: [],
  fields: [],
  followup_ids: [],
  ticket_form_id: 1260815150290,
  brand_id: 1260803299230,
  allow_channelback: false,
  allow_attachments: true,
};

jest.mock('./getTicket', () => {
  return {
    getTicket: jest.fn().mockResolvedValue({ ticket }),
  };
});

afterEach(cleanup);

describe('Testing TicketDetail Component', () => {
  it('Tickets renders Fetching... before fetching data', async () => {
    render(
      <BrowserRouter>
        <TicketDetail />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).toBeInTheDocument()
    );
    expect(getTicket).toHaveBeenCalledTimes(1);
    //expect empty string because when render TicketDetail, does not have an URL to parse, thus its undefined. TicketDetail implementation automatically pass in '' when URL parses to undefined
    expect(getTicket).toHaveBeenCalledWith('');
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
  });
  it('Ticket renders data correctly after fetching data', async () => {
    render(
      <BrowserRouter>
        <TicketDetail />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
    expect(
      screen.queryByText('magna reprehenderit nisi est cillum')
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Sit sit consequat magna aliquip officia qui. Fugiat amet id dolor sint exercitation sit. Eiusmod ex eiusmod voluptate voluptate est amet non culpa minim enim minim. Eiusmod fugiat veniam duis eiusmod sint laborum ex amet occaecat. Nostrud consequat officia tempor amet eu. Non adipisicing dolore amet minim id consequat labore irure in esse et aliqua pariatur. Aliquip aliqua id ipsum amet laboris exercitation sunt cillum est et est. Tempor amet qui do dolore fugiat ad id nulla ullamco dolore tempor irure deserunt magna. Ipsum voluptate aliquip ut ad in pariatur adipisicing occaecat ea excepteur Lorem enim exercitation. Lorem sunt officia voluptate pariatur labore esse nostrud ullamco irure sit. Voluptate exercitation do aliquip eu consectetur.'
      )
    ).toBeInTheDocument();

    expect(screen.queryByText('Allow attachments')).toBeInTheDocument();
    expect(screen.queryByText('No channelback')).toBeInTheDocument();
    expect(screen.queryByText('No incidents')).toBeInTheDocument();
    expect(screen.queryByText('Public')).toBeInTheDocument();
    expect(screen.queryByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('aliquip')).toBeInTheDocument();
    expect(screen.queryByText('magna')).toBeInTheDocument();
    expect(screen.queryByText('non')).toBeInTheDocument();
  });
});
