import { AppProviders } from "./app/providers.jsx";
import { BootstrapGuard } from "./components/navigation/BootstrapGuard.jsx";

/**
 * Root application component.
 * Wraps providers in BootstrapGuard to ensure bootstrapping is complete.
 * @returns {JSX.Element}
 */
const App = () => (
  <BootstrapGuard>
    <AppProviders />
  </BootstrapGuard>
);

export default App;
