import CreateGame from "@/pages/CreateGame";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ViewGame from "@/pages/ViewGame";
import { createBrowserRouter } from "react-router-dom";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: Index,
  },
  {
    path: "/create",
    Component: CreateGame,
  },
  {
    path: "/game/:gameId",
    Component: ViewGame,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
