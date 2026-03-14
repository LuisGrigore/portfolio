import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@pages/home/Home";
import NotFound from "@pages/NotFound";
import { PopupProvider } from "@shared/components/popup/PopupProvider";

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
