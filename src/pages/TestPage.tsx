import React from 'react';
import Review from '@/components/Review';

const TestPage: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Test Review and Rating</h1>
      <Review />
    </div>
  );
};

export default TestPage;
