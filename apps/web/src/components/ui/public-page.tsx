import React from 'react';

import { useNavigate } from '@tanstack/react-router';

type PublicPageProps = {
  children: React.ReactNode;
};

const PublicPage = ({ children }: PublicPageProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate({to: '/'})}>
        <h1 className="pt-2 text-4xl font-extrabold text-center text-gray-700">Odonto Chat</h1>
      </div>
      {children}
    </div>
  );
};

export default PublicPage;