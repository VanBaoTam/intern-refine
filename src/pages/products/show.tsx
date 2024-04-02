import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 123 });

  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  return <div>Product name: {data?.data.name}</div>;
};
