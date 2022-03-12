import { createContext, useContext, useState } from 'react';

export interface UserInfo {
  token: string;
}

interface AuthContextType {
  user?: UserInfo;
  setUser: (u?: UserInfo) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo>();

  const value: AuthContextType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
