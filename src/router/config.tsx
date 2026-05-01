import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ServicesPage from "../pages/services/page";
import ITSupportPage from "../pages/it-support/page";
import WebsiteDevPage from "../pages/website-dev/page";
import AboutPage from "../pages/about/page";
import ContactPage from "../pages/contact/page";
import BlogPage from "../pages/blog/page";
import AIGrowthKerala from "../pages/blog/ai-growth-kerala";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/it-support",
    element: <ITSupportPage />,
  },
  {
    path: "/website-dev",
    element: <WebsiteDevPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/ai-growth-kerala",
    element: <AIGrowthKerala />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
