import React from "react";
import { useLogin } from "@refinedev/core";
import FormInput from "../../components/auth/input";

export const Login = () => {
  const { mutate, isLoading } = useLogin();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    mutate(data);
  };

  return (
    <div className="">
      <div className="w-3/12 h-max mt-14 m-auto flex flex-col bg-white rounded-md">
        <h1 className="text-center font-semibold text-3xl shadow-part border-b-2 py-8">
          Login
        </h1>
        <form
          name="loginForm"
          onSubmit={onSubmit}
          className="w-full max-w-md mx-auto flex flex-col p-6"
        >
          <FormInput
            title="Username"
            field="name"
            type="name"
            name="username"
            defaultValue="testing"
          />
          <FormInput
            title="Password"
            field="password"
            type="password"
            name="password"
            defaultValue="12345678Chin!"
          />
          {isLoading && <span className="text-sm">Loading...</span>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
