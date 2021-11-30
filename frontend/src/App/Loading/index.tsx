import React, { FC } from 'react';
interface Props {
  loading: string;
}

const Loading: FC<Props> = ({ loading }) => {
  return (
    <>
      <div className="absolute bg-white top-20 bottom-0 w-full flex flex-row justify-center items-center">
        <div className="max-w-4xl w-full relative flex flex-col justify-center items-start">
          <div className="animate-pulse w-10/12 h-5 bg-gray-400 rounded-full my-4" />
          <div className="animate-pulse w-full h-5 bg-gray-400 rounded-full my-4" />
          <div className="animate-pulse w-full h-5 bg-gray-400 rounded-full my-4" />
          <div className="animate-pulse w-10/12 h-5 bg-gray-400 rounded-full my-4" />
          <div className="animate-pulse w-full h-5 bg-gray-400 rounded-full my-4" />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12">
            <h1 className="font-bold text-md animate-pulse">{loading}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
