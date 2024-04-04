import { useOne } from "@refinedev/core";
export const ShowProfile = () => {
  const { data, isLoading } = useOne({ resource: "get-profile", id: 0 });
  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Name</h1>
      <p>{data?.data.name}</p>
      <h1 className="text-2xl p-2 font-semibold">Email</h1>
      <p>{data?.data.email}</p>
      <h1 className="text-2xl p-2 font-semibold">Age</h1>
      <p>{data?.data.age}</p>
      <h1 className="text-2xl p-2 font-semibold">Emergency Contact</h1>
      <p>{data?.data.emergencyContact}</p>
      <h1 className="text-2xl p-2 font-semibold">Phone Number</h1>
      <p>{data?.data.numberPhone}</p>
    </div>
  );
};
