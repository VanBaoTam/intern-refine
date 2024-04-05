import { AuthProvider } from "@refinedev/core";
import { InitUserProvider, useDataProvider, useUserProvider } from "../hooks";
import { OnErrorResponse } from "@refinedev/core/dist/interfaces";
import { EnvironmentProvider } from "../helper/env.provider";
import { TEnv } from "../types";
const apiProvider = useDataProvider();
const baseUrl = EnvironmentProvider.getInstance().get(TEnv.VITE_AUTH_PATH);
const userProvider = useUserProvider();
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await apiProvider.post({
      baseUrl,
      path: `login`,
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response ?? {};
    console.log("[login-data] - ", data);
    if (data.token.value && data.token.type && data.role) {
      InitUserProvider(data.role, {
        type: data.token.type,
        value: data.token.value,
      });
      return { success: true, redirectTo: "/dashboard" };
    }
    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Login Failed",
      },
    };
  },
  check: async () => {
    const token = userProvider.findToken("Bearer");
    return { authenticated: Boolean(token) };
  },
  onError: async (error): Promise<OnErrorResponse> => {
    if (error?.status === 401) {
      return {
        logout: true,
      };
    }

    return {};
  },
  getIdentity: async () => {
    const token = userProvider.findToken("Bearer");
    if (!token) {
      return null;
    }
    const response = await apiProvider.get({
      baseUrl,
      path: `get-profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log("[getIdentity],", response);
    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.data;

    return data;
  },
  logout: async () => {
    userProvider.logout();
    return { success: true, redirectTo: "/" };
  },
};
