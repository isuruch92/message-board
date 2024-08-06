import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChannelsProvider } from "./context/ChannelsContext";

import AppLayout from "./pages/AppLayout";
import ChannelList from "./components/ChannelList";

function App() {
  return (
    <ChannelsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<AppLayout />}>
            <Route path="" element={<Navigate replace to="channels" />} />
            <Route path="channels" element={<ChannelList />} />
            <Route path="channels/:id" element={<ChannelList />} />
          </Route>
          <Route path="/" element={<Navigate replace to="app" />} />
          <Route path="*" element={<Navigate replace to="app" />} />
        </Routes>
      </BrowserRouter>
    </ChannelsProvider>
  );
}

export default App;
