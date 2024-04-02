import { Refine, Authenticated } from "@refinedev/core";
import { dataProvider } from "./providers/data.provider";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { authProvider } from "./providers/auth.provider";
import { Login } from "./pages/account/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { EditProfile, Profiles } from "./pages/profiles";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/utils/not-found";
export default function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          { name: "profiles", list: "/profiles", edit: "/profiles/edit/:id" },
          { name: "dashboard", list: "/dashboard" },
        ]}
      >
        <Layout>
          <Routes>
            <Route
              element={
                <Authenticated key="protected" fallback={<Login />}>
                  <NavigateToResource resource="dashboard" />
                </Authenticated>
              }
            >
              <Route path="/" element={<Login />} />
            </Route>
            <Route
              element={
                <Authenticated key="authenticated" redirectOnFail="/">
                  <Outlet />
                </Authenticated>
              }
            >
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="profiles">
                <Route index element={<Profiles />} />
                <Route path="edit/:id" element={<EditProfile />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Refine>
    </BrowserRouter>
  );
}
