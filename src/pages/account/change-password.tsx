import React from "react";
import { useUpdatePassword } from "@refinedev/core";
import FormInput from "../../components/auth/input";


export const UpdatePasswordPage = ({ onClose }: { onClose: () => void }) => {

    const {mutate} = useUpdatePassword();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = Object.fromEntries(
            new FormData(event.currentTarget).entries()
        );
        console.log(data)
        mutate(data);
    };

    const handleCloseClick = () => {
        onClose();
    };

    return (
        <form
            name="resetPasswordForm"
            onSubmit={onSubmit}
            className="w-full max-w-md mx-auto flex flex-col p-6"
        >
            <FormInput
                title="Old Password"
                field="oldPwd"
                type="text"
                name="oldPwd"
                defaultValue=""
            />
            <FormInput
                title="New Password"
                field="newPwd"
                type="text"
                name="newPwd"
                defaultValue=""
            />
            <FormInput
                title="ReNewPassword"
                field="retypePwd"
                type="text"
                name="retypePwd"
                defaultValue=""
            />
            <div className="flex mt-4 gap-4">
            <button
                type="submit"
                className="bg-blue-500 w-full text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
                Reset
            </button>
            <button
                type="button"
                className="bg-blue-500 w-full text-white py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600"
                onClick={handleCloseClick}
            >
                Close
            </button>
            </div>
        </form>
    );
};