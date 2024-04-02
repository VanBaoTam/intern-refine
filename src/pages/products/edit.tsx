import { useForm, useSelect } from "@refinedev/core";
import { useCallback, useMemo } from "react";

export const EditProfile = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    action: "edit",
    resource: "products",
    id: "123",
  });

  const record = queryResult!.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\d*\.?\d*"
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={record?.category.id == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
