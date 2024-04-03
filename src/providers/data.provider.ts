import type { DataProvider, GetListParams } from "@refinedev/core";
import { useDataProvider } from "../hooks";
import { EnvironmentProvider } from "../providers/env.provider";
import { TEnv } from "../types";
import { HTTP_ERROR_CODE } from "../constants";

const apiProvider = useDataProvider();
const API_URL = "https://api.fake-rest.refine.dev";
export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await apiProvider.get({ path: `${resource}/${id}` });
    console.log(
      "[get-one]: status - ",
      response.status,
      ", data:",
      response.data
    );
    return handleResponse(response);
  },
  update: async ({ resource, id, variables }) => {
    const response = await apiProvider.patch({
      path: `${resource}/${id}`,
      body: variables,
    });
    console.log("[update],", response);
    return handleResponse(response);
  },
  getList: async ({
    resource,
    pagination,
    filters,
    sorters,
  }: GetListParams) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append(
        "_start",
        (pagination.current! - 1) * pagination.pageSize! + ""
      );
      params.append("_end", pagination.current! * pagination.pageSize! + "");
    }
    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }
    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status >= 400) {
      throw response;
    }
    console.log("[get-list]: status - ", response.status);
    const data = await response.json();
    const total = Number(response.headers.get("x-total-count"));
    return {
      data,
      total,
    };
  },
  create: async ({ resource, variables }) => {
    const response = await apiProvider.post({
      path: `${resource}`,
      body: variables,
    });
    console.log("[create],", response);
    return handleResponse(response);
  },
  deleteOne: async ({ resource, id }) => {
    const response = await apiProvider.delete({ path: `${resource}/${id}` });
    console.log("[delete-one],", response);
    return handleResponse(response);
  },
  getApiUrl: () => EnvironmentProvider.getInstance().get(TEnv.baseUrl)!,
  getMany: async ({ resource, ids }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id + ""));
    }
    const response = await apiProvider.get({
      path: `${resource}?${params.toString()}`,
    });
    return handleResponse(response);
  },
};

const handleResponse = async (response: any) => {
  if (response.status >= HTTP_ERROR_CODE) {
    throw response;
  }
  return { data: response.data };
};
