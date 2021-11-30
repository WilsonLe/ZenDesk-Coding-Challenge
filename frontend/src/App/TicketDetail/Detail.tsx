import React, { FC } from 'react';
import { TicketData } from '../../types';

interface Props {
  ticket: TicketData;
}

const Detail: FC<Props> = ({ ticket }) => {
  return (
    <>
      <div className="px-4 pt-4 sm:px-6">
        <h3 className="text-md leading-6 font-medium text-gray-900">
          {ticket.subject}
        </h3>
      </div>
      <div className="border-gray-200 px-4 py-2 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Type
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.type ? ticket.type : 'null'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Description
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.description}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className=" max-w-lg mt-1">
                {ticket.allow_attachments ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-green-100 text-gray-800">
                    Allow attachments
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-red-100 text-gray-800">
                    No attachments
                  </span>
                )}
                {ticket.allow_channelback ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-green-100 text-gray-800">
                    Allow channelback
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-red-100 text-gray-800">
                    No channelback
                  </span>
                )}
                {ticket.has_incidents ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-green-100 text-gray-800">
                    Has incidents
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-red-100 text-gray-800">
                    No incidents
                  </span>
                )}
                {ticket.is_public ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-green-100 text-gray-800">
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-red-100 text-gray-800">
                    Private
                  </span>
                )}
                {ticket.status === 'open' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-green-100 text-gray-800">
                    Open
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-red-100 text-gray-800">
                    Close
                  </span>
                )}
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Tags
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="max-w-sm mt-1">
                {ticket.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-md font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Updated At
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.updated_at ? ticket.updated_at : 'null'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Created At
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.created_at ? ticket.created_at : 'null'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Due at
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.due_at ? ticket.due_at : 'null'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 border-b sm:border-none">
              Satisfaction rating
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.satisfaction_rating ? ticket.satisfaction_rating : 'null'}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};
export default Detail;
