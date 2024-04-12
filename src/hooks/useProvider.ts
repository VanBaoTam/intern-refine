import { EnvironmentProvider, UserProvider } from "../helper/";
import { DataProviderService } from "../services/data-provider.service";
import { TToken } from "../types";

export const useDataProvider = () => {
  return DataProviderService.getInstance();
};
export const useEnvProvider = () => {
  return EnvironmentProvider.getInstance();
};
export const InitUserProvider = (role: string, token: TToken) => {
  UserProvider.init(role, token);
};
export const useUserProvider = () => {
  return UserProvider.getInstance();
};
