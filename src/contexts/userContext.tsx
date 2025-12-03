import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api } from "../services/api";

// ============================
//         TIPOS
// ============================
export interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
}

export interface UserContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updatePlan: (plan: string) => Promise<boolean>;
}

// ============================
//         CONTEXTO
// ============================
const UserContext = createContext<UserContextType | undefined>(undefined);

// ============================
//         PROVIDER
// ============================
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ============================
  //   Carregar User do storage
  // ============================
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ============================
  //            LOGIN
  // ============================
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const res = await api.signIn({ email, password });
      if (!res.token || !res.user) return false;

      setUser(res.user);
      setToken(res.token);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  }, []);

  // ============================
  //          LOGOUT
  // ============================
  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  // ============================
  //      ATUALIZAR PLANO
  // ============================
  const updatePlan = useCallback(
    async (plan: string) => {
      if (!token || !user) return false;

      try {
        const res = await api.updatePlan(token, plan);
        if (!res.success) return false;

        const newUser = { ...user, plan };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        return true;
      } catch (err) {
        console.error("Erro ao atualizar plano:", err);
        return false;
      }
    },
    [token, user]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
        updatePlan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ============================
//         HOOK
// ============================
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be usado dentro de <UserProvider>");
  return context;
};
