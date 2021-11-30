import React, { FC } from 'react';
import { TicketData } from '../../types';
import { CalendarIcon, InformationCircleIcon } from '@heroicons/react/solid';
interface Props {
  ticket: TicketData;
}

const Ticket: FC<Props> = ({ ticket }) => {
  return (
    <li key={ticket.id}>
      <div className="block hover:bg-gray-50 border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {ticket.subject}
            </p>
          </div>
          <div className="mt-2 sm:flex sm:justify-between sm:flex-col">
            <div className="my-2 flex items-start text-sm text-gray-500 sm:mt-0">
              <InformationCircleIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <div>Type: {ticket.type ? ticket.type : 'null'}</div>
            </div>
            <div className="my-2 flex items-start text-sm text-gray-500 sm:mt-0">
              <InformationCircleIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <div>
                Status:
                <div className="max-w-lg mt-1">
                  {ticket.allow_attachments ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                      Allow attachments
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                      No attachments
                    </span>
                  )}
                  {ticket.allow_channelback ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                      Allow channelback
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                      No channelback
                    </span>
                  )}
                  {ticket.has_incidents ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                      Has incidents
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                      No incidents
                    </span>
                  )}
                  {ticket.is_public ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                      Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                      Private
                    </span>
                  )}
                  {ticket.status === 'open' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                      Open
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                      Close
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="my-2 flex items-start text-sm text-gray-500 sm:mt-0">
              <InformationCircleIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <div>
                Tags:
                <div className="max-w-lg mt-1">
                  {ticket.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 mr-2 mb-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p>Updated at: {new Date(ticket.updated_at).toUTCString()}</p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p>Created at: {new Date(ticket.created_at).toUTCString()}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Ticket;
