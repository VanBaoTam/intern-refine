import { HttpError, useList } from "@refinedev/core";
import "./list.css";
import ProfileTable from "../../components/profiles/Table";
export const Profiles = () => {
  const { data, isLoading, isError } = useList<any, HttpError>({
    resource: "get-users",
  });
  const profiles = data?.data ?? [];
  console.log("[profiles]", profiles);
  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="h-full bg-white px-4 overflow-y-auto">
      <h1 className="text-2xl p-2 font-semibold">Profiles</h1>
      <div className=" max-h-full">
        {!isError && profiles.length > 0 ? (
          <ProfileTable profiles={profiles} />
        ) : (
          <p>Error when fetching Profiles</p>
        )}
      </div>
    </div>
  );
};
