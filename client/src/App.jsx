import { AppProviders } from "./app/providers.jsx";
import { BootstrapGuard } from "./components/navigation/BootstrapGuard.jsx";

const App = () => (
  <BootstrapGuard>
    <AppProviders />
  </BootstrapGuard>
);

export default App;
