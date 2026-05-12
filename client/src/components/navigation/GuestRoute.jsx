import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { LoadingState } from "../feedback/LoadingState.jsx";

/**
 * Route guard that redirects authenticated users to dashboard.
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function GuestRoute({ children }) {
  const auth = useSelector((s) => s.auth);
  if (!auth) return <LoadingState />;
  if (auth.loading) return <LoadingState />;
  if (auth.isAuthenticated) return <Navigate to="/app/dashboard" replace />;
  return children;
}
