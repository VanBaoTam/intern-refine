import { TAsideLinks } from "../types";

const ADMIN_ASIDE_LINKS: TAsideLinks[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Profiles", link: "/profiles" },
];
const PATIENT_ASIDE_LINKS: TAsideLinks[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Profile", link: "/profiles/show/self" },
];
export { ADMIN_ASIDE_LINKS, PATIENT_ASIDE_LINKS };
