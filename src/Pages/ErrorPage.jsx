import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4 text-gray-700">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">
          The page you're looking for might have been moved or deleted.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
