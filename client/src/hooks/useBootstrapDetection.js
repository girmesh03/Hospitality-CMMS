import { useState, useEffect } from "react";
import axios from "axios";

export function useBootstrapDetection() {
  const [bootstrapRequired, setBootstrapRequired] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await axios.get("/api/v1/bootstrap/status");
        if (!cancelled) {
          setBootstrapRequired(res.data.data.bootstrapRequired);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setBootstrapRequired(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    check();

    return () => {
      cancelled = true;
    };
  }, []);

  return { bootstrapRequired, loading, error };
}
