import { useEffect, useState } from 'react';

const usePage: (
  count: number,
  perPage: number
) => {
  totalPages: number;
} = (count, perPage) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalPages / perPage));
  }, [count, perPage]);
  return { totalPages };
};
export default usePage;
