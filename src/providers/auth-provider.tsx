import { createContext, useContext, useEffect, useState } from "react";
import { useMeQuery } from "../tanstack/queries/auth.queries";
import type { OperationalState, Role } from "../types";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  operationalState: OperationalState;
};
type AuthData = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (value: AuthUser | null) => void;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: meData, isLoading } = useMeQuery();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (meData) {
      setUser(meData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [meData]);

  return (
    <AuthContext.Provider
      value={{
        user: meData ?? null,
        isAuthenticated: !!meData,
        isLoading,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
