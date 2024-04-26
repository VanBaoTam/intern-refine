import React from "react";

import { Textarea, TextInput } from "@mantine/core";
import { Edit, useForm } from "@refinedev/mantine";

export const EditProfile: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      phoneNumber: "",
      emergencyContact: "",
    },
    validate: {
      name: (value: string) =>
        value.length < 3 && "Title must be at least 3 characters",
      email: (value: string) => {
        return value.length < 10 && "Content must be at least 10 characters";
      },
      age: (value: number) => {
        return value < 10 && "Content must be at least 10 characters";
      },
      phoneNumber: (value: string) => {
        return value.length < 10 && "Content must be at least 10 characters";
      },
      emergencyContact: (value: string) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <Textarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
    </Edit>
  );
};
