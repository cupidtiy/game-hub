import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import GameDetailPage from "../pages/GameDetailPage";
import SearchPage from "../pages/SearchPage";
import CategoryPage from "../pages/CategoryPage";
import SlugRouter from "./SlugRouter";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'games/:slug', element: <SlugRouter /> },
        { path: 'games/search', element: <SearchPage /> },
      ]
    }
  ],
  {
    basename: '/game-hub' // ← add this!
  }
);


export default router;