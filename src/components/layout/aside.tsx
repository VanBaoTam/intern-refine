import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROLE, ADMIN_ASIDE_LINKS, PATIENT_ASIDE_LINKS } from "../../constants";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { ImProfile } from "react-icons/im";
import { TAsideLinks } from "../../types";
import { useUserProvider } from "../../hooks";

export const Aside = () => {
  const userProvider = useUserProvider();
  const [role, _] = useState(userProvider ? userProvider.getRole() : null);
  const location = useLocation() || "";
  const RenderIcons = useCallback((icon: string) => {
    switch (icon) {
      case "Dashboard": {
        return <TiHome />;
      }
      case "Profiles": {
        return <ImProfile />;
      }
      case "Profile": {
        return <ImProfile />;
      }
      default:
        break;
    }
  }, []);
  const RenderElements = useCallback(
    (arr: TAsideLinks[]) => {
      const elements = arr.map((ele: { name: string; link: string }) => (
        <div className="px-3 py-5 font-semibold" key={ele.link}>
          <Link
            to={ele.link}
            className={`flex flex-row items-center ${
              location.pathname === ele.link ? "text-yellow-500" : ""
            }`}
          >
            {RenderIcons(ele.name)}
            <span className="pl-4 text-lg">{ele.name}</span>
          </Link>
        </div>
      ));
      return elements;
    },
    [location]
  );
  return (
    <div className="bg-aside flex flex-col h-full min-w-56 max-w-56 text-white">
      <div className="h-16 w-full p-3 text-lg">COMPANY NAME</div>
      {role === ROLE.ADMIN_ROLE
        ? RenderElements(ADMIN_ASIDE_LINKS)
        : RenderElements(PATIENT_ASIDE_LINKS)}
    </div>
  );
};
