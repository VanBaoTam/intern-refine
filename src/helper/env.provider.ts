import { TEnv } from "../types";

export class EnvironmentProvider {
  private static instance: EnvironmentProvider;
  private constructor() {}
  static getInstance(): EnvironmentProvider {
    if (!EnvironmentProvider.instance) {
      EnvironmentProvider.instance = new EnvironmentProvider();
    }

    return EnvironmentProvider.instance;
  }
  get(key: TEnv) {
    return import.meta.env[key];
  }
}
