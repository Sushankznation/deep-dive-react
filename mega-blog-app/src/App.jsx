import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { useDispatch } from "react-redux";
import authService from "./AppWrite/auth";
import { login, logout } from "./Redux/features/authSlice";
import Loader from "./UI/Loader";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else {
          dispatch(logout());
        }
      })
      .catch((error) => alert("Not Login", error))
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <Header />
      <main>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default App;
