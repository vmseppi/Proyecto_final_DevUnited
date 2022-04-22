import { Navigate } from "react-router-dom";

const PublicRouter = ({ children, user }) => {
  return user ? <Navigate to="/" /> : children;
};

export default PublicRouter;
