import { useOne } from "@refinedev/core";
import FormInput from "../../components/auth/input";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
export const ShowProfile = () => {
  const { id } = useParams();
  const params = useMemo(() => {
    return { resource: "get-profile", id: id + "" };
  }, [id]);
  const { data, isLoading } = useOne(params);

  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Profile</h1>
      <div className="w-9/12 mx-auto">
        <form>
          <FormInput
            title="Name"
            field="name"
            type="text"
            name="name"
            disabled={true}
            defaultValue={data?.data.name}
          />
          <FormInput
            title="Email"
            field="email"
            type="email"
            name="email"
            disabled={true}
            defaultValue={data?.data.email}
          />
          <FormInput
            title="Age"
            field="age"
            type="number"
            name="age"
            disabled={true}
            defaultValue={data?.data.age}
            min={40}
            max={100}
          />
          <FormInput
            title="Phone Number"
            field="phoneNumber"
            type="text"
            name="phoneNumber"
            disabled={true}
            defaultValue={data?.data.phoneNumber}
          />
          <FormInput
            title="Emergency Contact"
            field="emergency"
            type="text"
            name="emergency"
            disabled={true}
            defaultValue={data?.data.emergencyContact}
          />
          <div className="text-center">
            <button
              type="submit"
              disabled={true}
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
