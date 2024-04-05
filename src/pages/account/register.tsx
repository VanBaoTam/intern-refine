import { useRegister } from "@refinedev/core";
import FormInput from "../../components/auth/input";

export const Register = () => {
  const { mutate, isLoading } = useRegister();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    mutate(data);
  };

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Register</h1>
      <form
        name="loginForm"
        onSubmit={onSubmit}
        className=" flex flex-row w-full max-w-4xl mx-48 p-6"
      >
        <div className="w-5/12 mx-auto">
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
          <FormInput
            title="Email"
            field="email"
            type="email"
            name="email"
            defaultValue="testing@gmail.com"
          />
        </div>
        <div className="w-5/12 mx-auto">
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
            name="emergencyContact"
            defaultValue="0111222333"
          />

          {isLoading && <span className="text-sm">Loading...</span>}
          <button
            type="submit"
            disabled={isLoading}
            className="block bg-blue-500 w-6/12 ml-auto text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
