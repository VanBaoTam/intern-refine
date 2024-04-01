import { useLogout, useGetIdentity } from "@refinedev/core";
interface Identity {
  name?: string;
}

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  return (
    <div className="bg-white flex content-between items-center h-16  shadow-part border-b-2">
      <div className="w-9/12"></div>
      <h1>
        <span className="">Welcome, </span>
        <span className="">{(identity as Identity)?.name ?? ""}</span>
      </h1>
      <button
        className="bg-orange-500 text-sm text-white px-3 py-1 rounded-md transition duration-300 hover:bg-orange-600 ml-12"
        type="button"
        disabled={isLoading}
        onClick={() => mutate()}
      >
        Logout
      </button>
    </div>
  );
};
