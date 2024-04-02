import { useTable, useMany } from "@refinedev/core";
import "./list.css";
export const Profiles = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return (
      <div className="h-full bg-white px-4 ">
        <h1 className="text-2xl p-2 font-semibold">Loading....</h1>
      </div>
    );
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrent(page);
  };

  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  };

  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === "desc"
        ? []
        : [
            {
              field,
              order: sorter === "asc" ? "desc" : "asc",
            },
          ]
    );
  };

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">Profiles</h1>
      <div className="overflow-x-auto ">
        <table className="table-auto border border-solid border-collapse border-gray-300 w-full">
          <thead>
            <tr className="">
              <th onClick={() => onSort("id")} className="cursor-pointer w-8">
                ID {indicator[getSorter("id")!]}
              </th>
              <th
                onClick={() => onSort("name")}
                className="cursor-pointer w-40"
              >
                Name {indicator[getSorter("name")!]}
              </th>
              <th className="cursor-pointer w-28">Category</th>
              <th
                onClick={() => onSort("material")}
                className="cursor-pointer w-52"
              >
                Material {indicator[getSorter("material")!]}
              </th>
              <th
                onClick={() => onSort("price")}
                className="cursor-pointer w-10"
              >
                Price {indicator[getSorter("price")!]}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data?.data?.map((product) => (
              <tr key={product.id}>
                <td className="">{product.id}</td>
                <td className="">{product.name}</td>
                <td className="">
                  {
                    categories?.data?.find(
                      (category) => category.id == product.category?.id
                    )?.title
                  }
                </td>
                <td className="">{product.material}</td>
                <td className="">{product.price}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600"
          disabled={current === 1}
        >
          {"<"}
        </button>
        <div className="flex">
          {current - 1 > 0 && (
            <button
              onClick={() => onPage(current - 1)}
              className="mx-1 px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            >
              {current - 1}
            </button>
          )}
          <button className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
            {current}
          </button>
          {current + 1 <= pageCount && (
            <button
              onClick={() => onPage(current + 1)}
              className="mx-1 px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            >
              {current + 1}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600"
          disabled={current === pageCount}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
