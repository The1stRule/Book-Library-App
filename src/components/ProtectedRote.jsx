import { Navigate } from "react-router-dom";

const ProtectedProte = ({ thisUser, children }) => {

    if(Object.keys(thisUser).length === 0) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedProte;