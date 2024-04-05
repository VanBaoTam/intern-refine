import type { DataProvider, GetListParams } from "@refinedev/core";
import { useDataProvider, useUserProvider } from "../hooks";
import { EnvironmentProvider } from "../helper/env.provider";
import { TEnv } from "../types";
import { HTTP_ERROR_CODE } from "../constants";
import { GetRole } from "../utils";

const apiProvider = useDataProvider();
const userProvider = useUserProvider();

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const rolePath = GetRole(userProvider.getRole());
    const path = id
      ? `${rolePath}/${resource}/${id}`
      : `${rolePath}/${resource}`;
    const token = userProvider.findToken("Bearer");
    const response = await apiProvider.get({
      path,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[update],", response);
    return handleResponse(response);
  },
  getList: async ({ resource }: GetListParams) => {
    const rolePath = GetRole(userProvider.getRole());
    const response = await apiProvider.get({
      path: `${rolePath}/${resource}`,
      headers: {
        Authorization: "Bearer " + userProvider.findToken("Bearer"),
      },
    });
    const data = response.data || [];
    const total = data.length;
    return {
      data,
      total,
    };
  },
  create: async ({ resource, variables }) => {
    const response = await apiProvider.post({
      path: `${resource}`,
      body: variables,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[create],", response);
    return handleResponse(response);
  },
  deleteOne: async ({ resource, id }) => {
    const response = await apiProvider.delete({ path: `${resource}/${id}` });
    console.log("[delete-one],", response);
    return handleResponse(response);
  },
  getApiUrl: () => EnvironmentProvider.getInstance().get(TEnv.VITE_BASE_URL)!,
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
