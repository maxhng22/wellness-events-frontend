import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/authApi";

type User = {
  id: string;
  role: "hr" | "vendor";
  username: string;
  companyName: string;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  loginLoading: boolean;   // for login button
  loginError: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // restore user on refresh
  useEffect(() => {
    let isMounted = true; // ← guard
    console.log("Restoring session...");
    setLoading(false);

    const loadUser = async () => {
      try {
        const res = await authAPI.getCurrentUser();
        if (isMounted) setUser(res.data?.data); // ← only set if still mounted
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUser();

    return () => {
      isMounted = false; // ← cleanup
    };
  }, []);

  const login = async (username: string, password: string) => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      await authAPI.login({ username, password });
      const res = await authAPI.getCurrentUser();
      setUser(res.data?.data); // ← actually set the user!
    } catch (err: any) {
      console.error("Login error:", err);
      setLoginError(err.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginLoading, loginError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}