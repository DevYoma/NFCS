import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Features/store";

const PrivateRoute = () => {
    // @ts-ignore
    const user = useSelector((state: RootState) => state.user.user);

    return user ? <Outlet /> : <Navigate to={'/'}/>
}

export default PrivateRoute