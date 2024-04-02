import { ReactNode } from "react";
import { Aside } from "./aside";
import { Header } from "./header";
import { useLocation } from "react-router-dom";

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation() || "";
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-800 flex flex-col  w-full h-screen">
      <div className="flex h-full">
        {location?.pathname !== "/" ? (
          <>
            <Aside />
            <div className="flex flex-col h-full w-11/12">
              <Header />
              {children}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full m-auto w-11/12">{children}</div>
        )}
      </div>
    </div>
  );
}

export default Layout;
