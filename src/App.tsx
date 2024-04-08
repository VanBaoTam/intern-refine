import { Refine, Authenticated } from "@refinedev/core";
import "react-toastify/dist/ReactToastify.css";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { Login } from "./pages/account/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { EditProfile, Profiles, ShowProfile } from "./pages/profiles";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/utils/not-found";
import { Register } from "./pages/account/register";
import { dataProvider, authProvider, notificationProvider } from "./providers";
import Toast from "./components/toast";
export default function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "profiles",
            list: "/profiles",
            edit: "/profiles/edit/:id",
            show: "profiles/show/:id",
          },
          { name: "dashboard", list: "/dashboard" },
        ]}
      >
        <Toast />
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
                <Route path="show/:id" element={<ShowProfile />} />
              </Route>
              <Route path="accounts">
                <Route index element={<Profiles />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Refine>
    </BrowserRouter>
  );
}
