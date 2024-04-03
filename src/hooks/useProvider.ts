import { EnvironmentProvider } from "../providers/env.provider";
import { DataProviderService } from "../services/data-provider.service";

export const useDataProvider = () => {
  return DataProviderService.getInstance();
};
export const useEnvProvider = () => {
  return EnvironmentProvider.getInstance();
};
