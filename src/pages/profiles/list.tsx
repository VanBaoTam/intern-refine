import { HttpError, useList } from "@refinedev/core";
import "./list.css";
import { useEffect } from "react";
export const Profiles = () => {
  const { data, isLoading, isError } = useList<any, HttpError>({
    resource: "get-users",
  });

  const profiles = data?.data ?? [];

  // const { data: categories } = useMany({
  //   resource: "categories",
  //   ids: data?.data?.map((product) => product.category?.id) ?? [],
  // });
  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Profiles</h1>
      <div className="overflow-x-auto ">
        {!isError ? (
          <ul>
            {profiles.map((profile: any) => (
              <li key={profile.id}>
                <h4>
                  {profile.name} - SDT - ({profile.phoneNumber})
                </h4>
              </li>
            ))}
          </ul>
        ) : (
          <p>Error when fetching Profiles</p>
        )}
      </div>
    </div>
  );
};
