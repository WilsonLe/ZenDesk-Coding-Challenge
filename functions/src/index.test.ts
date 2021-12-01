import 'ts-jest';
import { testEnv } from './firebase.config';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import * as myFunctions from '.';

describe('getTickets callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.getTickets);
  });

  it('returns status 200', async () => {
    const data = await wrapped({ url: undefined });
    expect(data).toBeDefined();
  });
  it('returns correct data', async () => {
    const data = await wrapped({ url: undefined });
    expect(data.tickets).toBeDefined();
    expect(data.tickets).toHaveLength(25);
    expect(data.count).toBeDefined();
    expect(data.count).toBe(101);
    expect(data.meta).toBeDefined();
  });
});

describe('getTicket callable', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(myFunctions.getTicket);
  });

  it('returns status 200', async () => {
    const data = await wrapped({ ticketId: '2' });
    expect(data).toBeDefined();
  });

  it('returns correct data for ticketId 2', async () => {
    const data = await wrapped({ ticketId: '2' });
    expect(data.ticket).toBeDefined();
    expect(JSON.stringify(data.ticket)).toBe(
      JSON.stringify({
        url: 'https://zccwilsonle.zendesk.com/api/v2/tickets/2.json',
        id: 2,
        external_id: null,
        via: { channel: 'api', source: { from: {}, to: {}, rel: null } },
        created_at: '2021-11-27T04:47:57Z',
        updated_at: '2021-11-27T04:47:57Z',
        type: null,
        subject: 'velit eiusmod reprehenderit officia cupidatat',
        raw_subject: 'velit eiusmod reprehenderit officia cupidatat',
        description:
          'Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n' +
          '\n' +
          'Aliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.',
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
        tags: ['est', 'incididunt', 'nisi'],
        custom_fields: [],
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        fields: [],
        followup_ids: [],
        ticket_form_id: 1260815150290,
        brand_id: 1260803299230,
        allow_channelback: false,
        allow_attachments: true,
      })
    );
  });

  it('returns correct data for ticketId 3', async () => {
    const data = await wrapped({ ticketId: '3' });
    expect(data.ticket).toBeDefined();
    expect(JSON.stringify(data.ticket)).toBe(
      JSON.stringify({
        url: 'https://zccwilsonle.zendesk.com/api/v2/tickets/3.json',
        id: 3,
        external_id: null,
        via: { channel: 'api', source: { from: {}, to: {}, rel: null } },
        created_at: '2021-11-27T04:47:58Z',
        updated_at: '2021-11-27T04:47:58Z',
        type: null,
        subject: 'excepteur laborum ex occaecat Lorem',
        raw_subject: 'excepteur laborum ex occaecat Lorem',
        description:
          'Exercitation amet in laborum minim. Nulla et veniam laboris dolore fugiat aliqua et sit mollit. Dolor proident nulla mollit culpa in officia pariatur officia magna eu commodo duis.\n' +
          '\n' +
          'Aliqua reprehenderit aute qui voluptate dolor deserunt enim aute tempor ad dolor fugiat. Mollit aliquip elit aliqua eiusmod. Ex et anim non exercitation consequat elit dolore excepteur. Aliqua reprehenderit non culpa sit consequat cupidatat elit.',
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
        tags: ['amet', 'labore', 'voluptate'],
        custom_fields: [],
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        fields: [],
        followup_ids: [],
        ticket_form_id: 1260815150290,
        brand_id: 1260803299230,
        allow_channelback: false,
        allow_attachments: true,
      })
    );
  });
});
