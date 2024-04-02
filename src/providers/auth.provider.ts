import { AuthProvider } from "@refinedev/core";
import { OnErrorResponse } from "@refinedev/core/dist/interfaces";
const AUTH_PATH = "https://api.fake-rest.refine.dev/auth";
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(AUTH_PATH + "/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
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
    const response = await fetch(AUTH_PATH + "/me", {
      headers: {
        Authorization: token,
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    return { success: true, redirectTo: "/" };
  },
};
