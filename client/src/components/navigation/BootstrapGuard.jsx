import { useBootstrapDetection } from "../../hooks/useBootstrapDetection.js";
import BootstrapPage from "../../pages/bootstrap/BootstrapPage.jsx";
import { LoadingState } from "../feedback/LoadingState.jsx";

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
