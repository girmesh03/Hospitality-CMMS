import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { LoadingState } from "../feedback/LoadingState.jsx";
import { ForbiddenPage } from "../../pages/ForbiddenPage.jsx";

/**
 * Route guard that redirects unauthenticated users to login.
 * @param {{ roles?: string[], children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function ProtectedRoute({ roles, children }) {
  const auth = useSelector((s) => s.auth);
  if (!auth) return <LoadingState />;
  if (auth.loading) return <LoadingState />;
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.some((r) => auth.user?.roleKeys?.includes(r)))
    return <ForbiddenPage />;
  return children;
}
