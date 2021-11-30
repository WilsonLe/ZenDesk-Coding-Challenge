import React, { FC, useState } from 'react';
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
  setLoading: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Pagination: FC<Props> = ({
  count,
  perPage,
  meta,
  setMeta,
  setTickets,
  setError,
  setLoading,
}) => {
  const [prevAction, setPrevAction] = useState<'prev' | 'next' | undefined>();
  const [page, setPage] = useState<number>(1);
  const [maxPage] = useState<number>(Math.ceil(count / perPage));

  const prevHandler = async () => {
    if (meta && (prevAction === 'next' || meta.has_more)) {
      setLoading('Fetching...');
      try {
        const { meta: newMeta, tickets } = await getTickets(meta.prev);
        setMeta(newMeta);
        setTickets(tickets);
        setPage(page - 1 === 1 ? 1 : page - 1);
        setPrevAction('prev');
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
      setLoading('Fetching...');
      try {
        const { meta: newMeta, tickets } = await getTickets(meta.next);
        setMeta(newMeta);
        setTickets(tickets);
        setPage(page + 1 === maxPage ? maxPage : page + 1);

        setPrevAction('next');
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

  return (
    <div className="max-w-4xl flex flex-row justify-center items-center w-full h-full">
      <div className="w-full flex flex-row justify-around sm:justify-between items-center">
        <button
          disabled={page === 1}
          onClick={prevHandler}
          className={`relative inline-flex justify-center items-center px-4 py-2 border border-gray-300 ${
            page === 1 && 'bg-gray-300'
          } text-sm font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 w-20`}
        >
          Back
        </button>
        <div className="w-12 flex justify-center items-center border rounded-md border-gray-300">{`${page}/${maxPage}`}</div>
        <button
          disabled={page === maxPage}
          onClick={nextHandler}
          className={`ml-3 relative inline-flex justify-center items-center px-4 py-2 border border-gray-300 ${
            page === maxPage && 'bg-gray-300'
          } text-sm font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 w-20`}
        >
          Next
        </button>
      </div>
      {/* <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
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
      </div> */}
    </div>
  );
};
export default Pagination;
