// hooks/useLogin.ts
import { useState } from "react";
import { authAPI } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authAPI.login({ username, password });
      if (res.data.success) {
        // save user to localStorage for demo
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
}