import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ServicesPage from "../pages/services/page";
import ITSupportPage from "../pages/services/it-support/page";
import WebsiteDevPage from "../pages/services/website-dev/page";
import AboutPage from "../pages/about/page";
import ContactPage from "../pages/contact/page";
import BlogPage from "../pages/resources/page";
import AIGrowthKerala from "../pages/resources/ai-growth-kerala";
import GMBOptimization from "../pages/resources/gmb-optimization";
import WhatsAppMarketingUAE from "../pages/resources/whatsapp-marketing-uae";
import FastWebsiteKerala from "../pages/resources/fast-website-kerala";
import ChoosingITPartner from "../pages/resources/choosing-it-partner";
import FirstClientPage from "../pages/first-client/page";
import WomenIncomeIdeasPage from "../pages/women-income-ideas/page";
import ThankYouPage from "../pages/thank-you/page";
import ProductAccessPage from "../pages/product-access/page";
import ProductDetailPage from "../pages/product-detail/page";
import ProductsPage from "../pages/products/page";

import TermsPage from "../pages/terms/page";
import PrivacyPolicyPage from "../pages/privacy/page";
import AdminReviewsPage from "../pages/admin/reviews/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/admin/reviews",
    element: <AdminReviewsPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/services/it-support",
    element: <ITSupportPage />,
  },
  {
    path: "/services/website-development",
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
    path: "/resources",
    element: <BlogPage />,
  },
  {
    path: "/resources/ai-business-growth-kerala",
    element: <AIGrowthKerala />,
  },
  {
    path: "/resources/google-business-profile-tips",
    element: <GMBOptimization />,
  },
  {
    path: "/resources/whatsapp-marketing-guide-uae",
    element: <WhatsAppMarketingUAE />,
  },
  {
    path: "/resources/fast-website-benefits-kerala",
    element: <FastWebsiteKerala />,
  },
  {
    path: "/resources/choosing-right-it-partner",
    element: <ChoosingITPartner />,
  },
  {
    path: "/first-client",
    element: <FirstClientPage />,
  },
  {
    path: "/women-income-ideas",
    element: <WomenIncomeIdeasPage />,
  },
  {
    path: "/thank-you",
    element: <ThankYouPage />,
  },
  {
    path: "/product-access",
    element: <ProductAccessPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/:slug",
    element: <ProductDetailPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
