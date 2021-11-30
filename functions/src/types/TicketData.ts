export type URL = string;
export type TicketData = {
  url: URL;
  id: number;
  external_id: null;
  via: any; // unclear typings
  created_at: string;
  updated_at: string;
  type: string | null;
  subject: string;
  raw_subject: string;
  description: string;
  priority: string | null;
  status: 'open' | 'close';
  recipient: null;
  requester_id: number;
  submitter_id: number;
  assignee_id: number;
  organization_id: number | null;
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

export type GetTicketsResData = {
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

export type LengthResData = {
  count: {
    value: number;
    refreshed_at: string;
  };
};

export type TicketMeta = {
  has_more: boolean;
  prev: URL;
  next: URL;
};

// ticket data from calling using id is different from ticket data calling everything. it has one extra key "field" that maps to array of presumably strings
export type TicketDataWithFields = TicketData & { fields: string[] };

export type GetTicketResData = {
  ticket: TicketDataWithFields;
};
