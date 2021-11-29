import React, { FC, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FirebaseError } from '@firebase/app';
import { TicketData, TicketMeta } from '../../types';
import { getTickets } from '../Main/getTickets';

interface Props {
  count: number;
  perPage: number;
  meta: TicketMeta | undefined;
  setMeta: React.Dispatch<React.SetStateAction<TicketMeta | undefined>>;
  setTickets: React.Dispatch<React.SetStateAction<TicketData[] | undefined>>;
  setError: React.Dispatch<
    React.SetStateAction<Error | FirebaseError | undefined>
  >;
  setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pagination: FC<Props> = ({
  count,
  perPage,
  meta,
  setMeta,
  setTickets,
  setError,
  setIsLoadingPage,
}) => {
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(start + perPage - 1);
  const [prevAction, setPrevAction] = useState<'prev' | 'next' | undefined>();
  const [atUpperEdge, setAtUpperEdge] = useState<boolean>(false);
  const [atLowerEdge, setAtLowerEdge] = useState<boolean>(true);
  const [disablePrev, setDisablePrev] = useState<boolean>(false);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  const prevHandler = async () => {
    if (meta && (prevAction === 'next' || meta.has_more)) {
      setIsLoadingPage(true);
      setDisablePrev(true);
      try {
        const { meta: newMeta, tickets } = await getTickets(meta.prev);
        setMeta(newMeta);
        setTickets(tickets);
        setStart(start - perPage);
        setEnd(end - perPage);
        setPrevAction('prev');
        setDisablePrev(false);
      } catch (error) {
        setError(
          new Error(
            'Unexpected error has occur, please try refresh applicaiton'
          )
        );
      }
    } else {
      setError(
        new Error('Unexpected error has occur, please try refresh applicaiton')
      );
    }
  };
  const nextHandler = async () => {
    if (meta && (prevAction === 'prev' || meta.has_more)) {
      setIsLoadingPage(true);
      setDisableNext(true);
      try {
        const { meta: newMeta, tickets } = await getTickets(meta.next);
        setMeta(newMeta);
        setTickets(tickets);
        setStart(start + perPage);
        setEnd(end + perPage);
        setPrevAction('next');
        setDisableNext(false);
      } catch (error) {
        setError(
          new Error(
            'Unexpected error has occur, please try refresh applicaiton'
          )
        );
      }
    } else {
      setError(
        new Error('Unexpected error has occur, please try refresh applicaiton')
      );
    }
  };

  useEffect(() => {
    setAtLowerEdge(start <= 1);
    setAtUpperEdge(end >= count);
  }, [start, end]);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {!atLowerEdge && (
          <button
            disabled={disablePrev}
            onClick={prevHandler}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        {!atUpperEdge && (
          <button
            disabled={disableNext}
            onClick={nextHandler}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{start < 0 ? 1 : start}</span> to{' '}
              <span className="font-medium">{end > count ? count : end}</span>{' '}
              of <span className="font-medium">{count}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {!atLowerEdge && (
                <button
                  disabled={disablePrev}
                  onClick={prevHandler}
                  className="w-18 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Prev</span>
                </button>
              )}
              {!atUpperEdge && (
                <button
                  disabled={disableNext}
                  onClick={nextHandler}
                  className="w-18 srelative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 justify-center"
                >
                  <span className="sr-only">Next</span>
                  <span>Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
