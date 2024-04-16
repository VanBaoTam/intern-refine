import {useOne, useUpdate} from "@refinedev/core";
import FormInput from "../../components/auth/input";
import { useParams } from "react-router-dom";
import React from "react";
export const ShowProfile = () => {
  const { id } = useParams();

  const { data, isLoading } = useOne({
    resource: "get-profile",
    id: id + "",
    meta: {
      variables: {
        name: "user",
      },
    },
  });

  const { mutate } = useUpdate();

  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
        new FormData(event.currentTarget).entries()
    );

    mutate({
      resource: "update-profile",
      id: id + "",
      values : {
        profile: data,
      },
    });
  };

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Profile</h1>
      <div className="w-9/12 mx-auto">
        <form onSubmit={onSubmit}>
          <FormInput
            title="Name"
            field="name"
            type="text"
            name="name"
            defaultValue={data?.data.name}
          />
          <FormInput
            title="Email"
            field="email"
            type="email"
            name="email"
            defaultValue={data?.data.email}
          />
          <FormInput
            title="Age"
            field="age"
            type="number"
            name="age"
            defaultValue={data?.data.age}
            min={40}
            max={100}
          />
          <FormInput
            title="Phone Number"
            field="phoneNumber"
            type="text"
            name="phoneNumber"
            defaultValue={data?.data.phoneNumber}
          />
          <FormInput
            title="Emergency Contact"
            field="emergency"
            type="text"
            name="emergency"
            defaultValue={data?.data.emergencyContact}
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 w-20 text-white py-2  mt-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
