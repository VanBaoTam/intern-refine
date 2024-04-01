import { Refine, Authenticated } from "@refinedev/core";
import { dataProvider } from "./providers/data.provider";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { authProvider } from "./providers/auth.provider";
import { Login } from "./pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { EditProfile, Profiles } from "./pages/products";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
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
                <Authenticated key="authenticated" redirectOnFail="/login">
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
          </Routes>
        </Layout>
      </Refine>
    </BrowserRouter>
  );
}
