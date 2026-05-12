import { lazy, Suspense } from 'react';
import type { RouteObject } from "react-router-dom";

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
  </div>
);

// Lazy-loaded routes — only the current route's chunk downloads
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/home/page"));
const ServicesPage = lazy(() => import("../pages/services/page"));
const ITSupportPage = lazy(() => import("../pages/services/it-support/page"));
const WebsiteDevPage = lazy(() => import("../pages/services/website-dev/page"));
const AboutPage = lazy(() => import("../pages/about/page"));
const ContactPage = lazy(() => import("../pages/contact/page"));
const BlogPage = lazy(() => import("../pages/resources/page"));
const AIGrowthKerala = lazy(() => import("../pages/resources/ai-growth-kerala"));
const GMBOptimization = lazy(() => import("../pages/resources/gmb-optimization"));
const WhatsAppMarketingUAE = lazy(() => import("../pages/resources/whatsapp-marketing-uae"));
const FastWebsiteKerala = lazy(() => import("../pages/resources/fast-website-kerala"));
const ChoosingITPartner = lazy(() => import("../pages/resources/choosing-it-partner"));
const FirstClientPage = lazy(() => import("../pages/first-client/page"));
const WomenIncomeIdeasPage = lazy(() => import("../pages/women-income-ideas/page"));
const ThankYouPage = lazy(() => import("../pages/thank-you/page"));
const ProductAccessPage = lazy(() => import("../pages/product-access/page"));
const ProductDetailPage = lazy(() => import("../pages/product-detail/page"));
const ProductsPage = lazy(() => import("../pages/products/page"));
const TermsPage = lazy(() => import("../pages/terms/page"));
const PrivacyPolicyPage = lazy(() => import("../pages/privacy/page"));
const AdminReviewsPage = lazy(() => import("../pages/admin/reviews/page"));

const wrap = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const routes: RouteObject[] = [
  { path: "/", element: wrap(<Home />) },
  { path: "/terms-and-conditions", element: wrap(<TermsPage />) },
  { path: "/privacy-policy", element: wrap(<PrivacyPolicyPage />) },
  { path: "/admin/reviews", element: wrap(<AdminReviewsPage />) },
  { path: "/services", element: wrap(<ServicesPage />) },
  { path: "/services/it-support", element: wrap(<ITSupportPage />) },
  { path: "/services/website-development", element: wrap(<WebsiteDevPage />) },
  { path: "/about", element: wrap(<AboutPage />) },
  { path: "/contact", element: wrap(<ContactPage />) },
  { path: "/resources", element: wrap(<BlogPage />) },
  { path: "/resources/ai-business-growth-kerala", element: wrap(<AIGrowthKerala />) },
  { path: "/resources/google-business-profile-tips", element: wrap(<GMBOptimization />) },
  { path: "/resources/whatsapp-marketing-guide-uae", element: wrap(<WhatsAppMarketingUAE />) },
  { path: "/resources/fast-website-benefits-kerala", element: wrap(<FastWebsiteKerala />) },
  { path: "/resources/choosing-right-it-partner", element: wrap(<ChoosingITPartner />) },
  { path: "/first-client", element: wrap(<FirstClientPage />) },
  { path: "/women-income-ideas", element: wrap(<WomenIncomeIdeasPage />) },
  { path: "/thank-you", element: wrap(<ThankYouPage />) },
  { path: "/product-access", element: wrap(<ProductAccessPage />) },
  { path: "/products", element: wrap(<ProductsPage />) },
  { path: "/:slug", element: wrap(<ProductDetailPage />) },
  { path: "*", element: wrap(<NotFound />) },
];

export default routes;
