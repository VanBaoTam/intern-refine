import { useLogout, useGetIdentity } from "@refinedev/core";
import { UpdatePasswordPage } from "../../pages/account/change-password.tsx";
import {useState} from "react";
interface Identity {
  name?: string;
}

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleUpdatePasswordClick = () => {
        setShowUpdatePassword(true);
    };

    const handleUpdatePasswordClose = () => {
        setShowUpdatePassword(false); // Đặt trạng thái `showUpdatePassword` thành `false`
    };

  return (
    <div className="bg-white flex content-between items-center min-h-16  shadow-part border-b-2">
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
        <button
            className="bg-blue-500 text-sm text-white px-3 py-1 rounded-md transition duration-300 hover:bg-blue-600 ml-4"
            type="button"
            onClick={handleUpdatePasswordClick}
        >
            Re-pass
        </button>
        {showUpdatePassword && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4">
                    <UpdatePasswordPage onClose={handleUpdatePasswordClose} />
                </div>
            </div>
        )}
    </div>
  );
};
