import React from 'react';
import { Button } from "../components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
// import { useLocation } from 'react-router-dom';

const EmailVerificationError: React.FC = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const errorMessage = queryParams.get('error') || 'An unknown error occurred.';
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-orange-600">
      <div className="bg-white rounded-lg shadow-md py-8 px-6 text-center max-w-lg">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Email Verification Required
        </h1>
        {/* <p className="text-xl mt-4 text-red-600">{errorMessage}</p> */}
        <p className="text-lg mt-2">
          Please verify your email to complete the sign-up process.
        </p>
      </div>
      <Button
        variant="ghost"
        className="font-bold hover:text-orange-500 hover:bg-white"
      >
        <a href='/'>Home</a>
      </Button>
      <Button
        variant="ghost"
        className="font-bold hover:text-orange-500 hover:bg-white"
        onClick={
          async () => {
            await loginWithRedirect();
          }
        }
      >
        Đăng nhập
      </Button>
    </div>
  );
};

export default EmailVerificationError;
