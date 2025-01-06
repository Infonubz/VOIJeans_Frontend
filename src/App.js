import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useEffect, useState } from "react";
import Request_Management from "./Components/Request_Management/Request_Management";
import Sidebar from "./Components/Common/Sidebar";
import Topbar from "./Components/Common/Topbar";
import Voi_Jeans_Login from "./Components/Login/Voi_Jeans_Login";
import Innofashion_Login from "./Components/Login/Innofashion_Login";
import Invoice from "./Components/Voi_Invoice/Invoice";

function App() {
  const [authtoken, setAuthtoken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthtoken(token);
    }
  }, [sessionStorage.getItem("token")]);
  return (
    <Router>
      <ToastContainer />
      {authtoken ? (
        <>
          <div className="flex flex-col overflow-hidden">
            {/* <Sidebar /> */}
            <div className="h-[7vh]">
            <Topbar />
            </div>
            <div className={`h-[93vh]`}>
              <Routes>
                <Route path="/" element={<Invoice />} />
                <Route
                  path="/request_management"
                  element={<Request_Management />}
                />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Innofashion_Login setAuthtoken={setAuthtoken} />} />
          <Route
            path="/voijeans"
            element={<Voi_Jeans_Login setAuthtoken={setAuthtoken} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
