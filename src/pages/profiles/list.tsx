import { HttpError, useList, useGo } from "@refinedev/core";
import "./list.css";
export const Profiles = () => {
  const { data, isLoading, isError } = useList<any, HttpError>({
    resource: "get-users",
  });
  const go = useGo();
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
          <table className="table-auto border border-solid border-collapse border-gray-300 w-full">
            <thead>
              <tr className="">
                <th className="cursor-pointer w-8">ID </th>
                <th className="cursor-pointer w-40">Name</th>
                <th className="cursor-pointer w-28">Phone Number</th>
                <th className="cursor-pointer w-28">Show Details</th>
              </tr>
            </thead>
            <tbody className="">
              {profiles?.map((profile) => {
                return (
                  <tr key={profile.id}>
                    <td className="px-4">{profile.id}</td>
                    <td className="px-4">{profile.name}</td>
                    <td className="px-4">{profile.numberPhone}</td>
                    <td className="pb-3">
                      <button
                        className="block bg-blue-500 w-5/12 m-auto text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
                        onClick={() => {
                          go({
                            to: {
                              resource: "profiles",
                              action: "show",
                              id: profile.id,
                            },
                          });
                        }}
                      >
                        Show details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Error when fetching Profiles</p>
        )}
      </div>
    </div>
  );
};
