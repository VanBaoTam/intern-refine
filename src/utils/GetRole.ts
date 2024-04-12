import { ROLES } from "../constants";

function GetRole(key: string): string {
  return ROLES.includes(key) ? key : "none";
}
export { GetRole };
