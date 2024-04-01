import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data.provider";
import { authProvider } from "./providers/auth.provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { Login } from "./pages/login";
import { Header } from "./components/header";
import { Aside } from "./components/aside";
export default function App(): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-800 flex flex-col  w-full h-screen">
      <Refine dataProvider={dataProvider} authProvider={authProvider}>
        <Authenticated key="protected" fallback={<Login />}>
          <div className="flex h-full">
            <Aside />
            <div className="flex flex-col h-full w-11/12">
              <Header />
              {/* <ShowProduct /> */}
              {/* <EditProduct /> */}
              <ListProducts />
              {/* <CreateProduct /> */}
            </div>
          </div>
        </Authenticated>
      </Refine>
    </div>
  );
}
