import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TicketData } from '../../types';
import { getTickets } from './getTickets';
import Main from '.';

const tickets: TicketData[] = [
  {
    url: 'https://zccwilsonle.zendesk.com/api/v2/tickets/25.json',
    id: 25,
    external_id: null,
    via: {
      channel: 'api',
      source: {
        from: {},
        to: {},
        rel: null,
      },
    },
    created_at: '2021-11-27T04:48:08Z',
    updated_at: '2021-11-27T04:48:08Z',
    type: null,
    subject: 'voluptate dolor deserunt ea deserunt',
    raw_subject: 'voluptate dolor deserunt ea deserunt',
    description:
      'Consectetur eiusmod pariatur ullamco voluptate irure sunt magna cillum velit irure commodo culpa ipsum in. Nulla non exercitation dolor quis minim deserunt ad consequat officia ullamco irure consectetur anim mollit. Cupidatat exercitation cillum excepteur culpa consectetur ad adipisicing exercitation est amet ullamco id eiusmod tempor. Aliqua quis irure culpa tempor mollit veniam. Fugiat aliquip duis non sit id eu ea anim sit ea aliqua et dolor.\n\nCulpa culpa culpa id proident dolor magna ipsum dolor irure mollit proident culpa. Officia Lorem veniam dolor sit commodo id consequat ex qui enim veniam. Laboris velit excepteur sit sit anim nulla exercitation.',
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
    tags: ['do', 'est', 'labore'],
    custom_fields: [],
    satisfaction_rating: null,
    sharing_agreement_ids: [],
    followup_ids: [],
    ticket_form_id: 1260815150290,
    brand_id: 1260803299230,
    allow_channelback: false,
    allow_attachments: true,
  },
];
jest.mock('./getTickets', () => {
  return {
    getTickets: jest.fn().mockResolvedValue({
      tickets,
      count: 1,
      meta: { has_more: true, prev: 'mock_url', next: 'mock_url' },
    }),
  };
});

afterEach(cleanup);

describe('Testing Main Component With 1 Ticket', () => {
  it('Renders Fetching... before fetching data', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).toBeInTheDocument()
    );
    expect(getTickets).toHaveBeenCalledTimes(1);
    expect(getTickets).toHaveBeenCalledWith(undefined);
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
  });
  it('Renders 1 out of 1 pages', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
    expect(screen.queryByText('1/1')).toBeInTheDocument();
  });
  it('Renders data correctly after fetching data', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
    expect(
      screen.queryByText('voluptate dolor deserunt ea deserunt')
    ).toBeInTheDocument();
    expect(screen.queryByText('Allow attachments')).toBeInTheDocument();
    expect(screen.queryByText('No channelback')).toBeInTheDocument();
    expect(screen.queryByText('No incidents')).toBeInTheDocument();
    expect(screen.queryByText('Public')).toBeInTheDocument();
    expect(screen.queryByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('do')).toBeInTheDocument();
    expect(screen.queryByText('est')).toBeInTheDocument();
    expect(screen.queryByText('labore')).toBeInTheDocument();
  });
  it('Does not render Fetching... when click next because there is only 1 ticket', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Next'));
    await waitFor(() =>
      expect(screen.queryByText('Fetching...')).not.toBeInTheDocument()
    );
  });
});
