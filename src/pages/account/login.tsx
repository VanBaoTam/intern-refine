import React, { useState } from "react";
import { useLogin } from "@refinedev/core";

import FormInput from "../../components/auth/input";

export const Login = () => {
  const { mutate, isLoading } = useLogin();
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    mutate(data);
    console.log("HERE");
  };

  return (
    <div className="">
      <div className="w-3/12 h-max mt-14 m-auto flex flex-col bg-white rounded-md">
        <h1 className="text-center font-semibold text-3xl shadow-part border-b-2 py-8">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>
        <form
          name={isSignUp ? "signUpForm" : "loginForm"}
          onSubmit={onSubmit}
          className="w-full max-w-md mx-auto flex flex-col p-6"
        >
          <FormInput
            title="Email"
            field="email"
            type="email"
            name="email"
            defaultValue="demo@demo.com"
          />
          {!isSignUp && (
            <FormInput
              title="Password"
              field="password"
              type="password"
              name="password"
              defaultValue="demodemo"
            />
          )}
          {isSignUp && (
            <React.Fragment>
              <FormInput
                title="Name"
                field="name"
                type="text"
                name="name"
                defaultValue="John Doe"
              />
              <FormInput
                title="Age"
                field="age"
                type="number"
                name="age"
                defaultValue={50}
                min={40}
                max={100}
              />
              <FormInput
                title="Phone Number"
                field="phoneNumber"
                type="text"
                name="phoneNumber"
                defaultValue="0111222333"
              />
              <FormInput
                title="Emergency Contact"
                field="emergency"
                type="text"
                name="emergency"
                defaultValue="0111222333"
              />
            </React.Fragment>
          )}
          {isLoading && <span className="text-sm">Loading...</span>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="flex flex-col items-center pb-10">
          <a
            onClick={() => {
              setIsSignUp((prev) => !prev);
            }}
            className="font-semibold hover:font-bold"
          >
            {isSignUp
              ? "Switch back to Login Page 👆🏻"
              : "Click me to create an account 👆🏻"}
          </a>
        </div>
      </div>
    </div>
  );
};
