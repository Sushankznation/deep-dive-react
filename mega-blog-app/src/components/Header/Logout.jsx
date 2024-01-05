import { useDispatch } from "react-redux";
import authService from "../../AppWrite/configure";
import logout from "../../Redux/features/authSlice";
export default function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout);
      })
      .catch((error) => console.log("error in Logout", error));
  };
  return (
    <button
      type="button"
      onClick={logoutHandler}
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >
      Logout
    </button>
  );
}
