import { TEnv } from "../types";

export class EnvironmentProvider {
  private static instance: EnvironmentProvider;
  private readonly BASE_URL = import.meta.env.VITE_BASE_URL;
  private constructor() {}
  static getInstance(): EnvironmentProvider {
    if (!EnvironmentProvider.instance) {
      EnvironmentProvider.instance = new EnvironmentProvider();
    }

    return EnvironmentProvider.instance;
  }
  get(name: TEnv) {
    switch (name) {
      case TEnv.baseUrl: {
        return this.BASE_URL;
      }

      default: {
        break;
      }
    }
  }
}
