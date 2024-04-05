import { TToken } from "../types";

export class UserProvider {
  private static instance: UserProvider;
  private role: number = 1;
  private tokens: TToken[] = [];

  private constructor() {}

  static getInstance() {
    if (!UserProvider.instance) {
      UserProvider.instance = new UserProvider();
      UserProvider.instance.setRole(1); // default - user
      UserProvider.instance.addToken({ type: "default", value: "default" }); //
    }

    return UserProvider.instance;
  }
  static init(role: number, token: TToken) {
    if (role !== undefined && token !== undefined) {
      UserProvider.instance.setRole(role);
      UserProvider.instance.addToken(token);
    }
  }
  public setRole(role: number) {
    this.role = role;
  }

  public getRole() {
    return this.role;
  }

  public addToken(token: TToken) {
    this.tokens.push(token);
  }
  public findToken(type: string) {
    const index = this.tokens.findIndex((token) => token.type === type);
    // if found
    if (index !== -1) {
      return this.tokens[index].value;
    }
  }
  public emptyToken() {
    this.tokens.length = 0;
  }
  public logout() {
    UserProvider.instance.setRole(-1);
    UserProvider.instance.emptyToken();
  }
}
