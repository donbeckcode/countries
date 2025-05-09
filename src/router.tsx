import { createBrowserRouter } from "react-router";
import App from "./App";
import { CountryDetails } from "./pages/CountryDetails/CountryDetails";

export const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
  {
    path: "/countries/:name",
    element: <CountryDetails />,
  },
]);
