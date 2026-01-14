import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthData, User } from "./auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: AuthData) => {
    localStorage.setItem("accessToken", data.token);
    setUser(data.user);
  };

  const loadUser = (data: User) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
