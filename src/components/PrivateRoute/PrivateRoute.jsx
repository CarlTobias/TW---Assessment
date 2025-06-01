import { Navigate, Outlet } from "react-router-dom";
import authStore from "../../stores/authStore";

const PrivateRoute = () => {
    const user = authStore((state) => state.user)
  return user ? <Outlet />: <Navigate to="/wooflesAuth?authtype=login"/>;
};

export default PrivateRoute;
