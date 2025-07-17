import React from "react";

interface ErrorProps {
  error?: any;
  errorName?: { message?: string | string[] };
}

const Error: React.FC<ErrorProps> = ({ error, errorName }) => {
  return (
    <>
      {Array.isArray(errorName?.message) ? (
        <ul className="text-red-400 text-sm mt-2">
          {errorName?.message?.map((msg, index) => (
            <li key={index} className="mb-1">
              {msg}
            </li>
          ))}
        </ul>
      ) : errorName?.message ? (
        <span className="text-red-400 text-sm mt-2">{errorName.message}</span>
      ) : (
        <span className="text-red-400 text-sm mt-2">
          {error?.response?.data?.message || error?.message}
        </span>
      )}
    </>
  );
};

export default Error;