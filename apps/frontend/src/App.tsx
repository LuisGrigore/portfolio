import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { PopupProvider } from "@components/popup/PopupProvider";

const App = () => {
  return (
    <PopupProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PopupProvider>
  );
};

export default App;
