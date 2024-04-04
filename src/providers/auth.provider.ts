import { AuthProvider } from "@refinedev/core";
import { useDataProvider } from "../hooks";
import { OnErrorResponse } from "@refinedev/core/dist/interfaces";
import { EnvironmentProvider } from "../helper/env.provider";
import { TEnv } from "../types";
const apiProvider = useDataProvider();
const baseUrl = EnvironmentProvider.getInstance().get(TEnv.VITE_AUTH_PATH);

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await apiProvider.post({
      baseUrl,
      path: `login`,
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[login] - ", response);
    const { data } = response ?? {};
    if (data.token.value && data.token.type && data.role) {
      localStorage.setItem("token", data.token.value);
      localStorage.setItem("type", data.token.type);

      return { success: true };
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
    const token = localStorage.getItem("my_access_token");
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
    const token = localStorage.getItem("my_access_token");
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
    localStorage.removeItem("my_access_token");
    return { success: true, redirectTo: "/" };
  },
};
