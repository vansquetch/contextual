import { useEffect, useState } from "react";
import { getSession } from "../services/auth.service";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
    });
  }, []);
  return { authenticated, setAuthenticated };
}
