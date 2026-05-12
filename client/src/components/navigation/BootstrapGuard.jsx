import { useBootstrapDetection } from "../../hooks/useBootstrapDetection.js";
import BootstrapPage from "../../pages/bootstrap/BootstrapPage.jsx";
import { LoadingState } from "../feedback/LoadingState.jsx";

/**
 * Guard component that checks whether the application requires bootstrapping.
 * Renders a loading indicator while checking, the bootstrap page if setup is
 * needed, or the children once bootstrap is confirmed complete.
 * @param {{ children: import("react").ReactNode }} props
 * @returns {JSX.Element}
 */
export function BootstrapGuard({ children }) {
  const { bootstrapRequired, loading } = useBootstrapDetection();

  if (loading) {
    return <LoadingState />;
  }

  if (bootstrapRequired) {
    return <BootstrapPage />;
  }

  return children;
}
