import React, { FC } from 'react';

interface Props {}

const Loading: FC<Props> = () => {
  return (
    <>
      <div className="relative">
        <div className="animate-pulse w-60 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-60 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-60 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="animate-pulse w-72 h-5 bg-gray-400 m-8 rounded-md" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-md animate-pulse">LOADING...</h1>
        </div>
      </div>
    </>
  );
};

export default Loading;
