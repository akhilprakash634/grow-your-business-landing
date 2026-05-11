import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SocialPopup from "./components/SocialPopup";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
        <SocialPopup />
        <WhatsAppButton />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
