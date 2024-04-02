import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-full bg-white px-4 ">
      <h1 className="text-2xl p-2 font-semibold">404 Page Not Found</h1>
      <Link
        to={"/dashboard"}
        className={
          "mr-2 px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600"
        }
      >
        Click me to return to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
