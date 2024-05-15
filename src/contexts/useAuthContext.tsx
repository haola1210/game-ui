import { IUser } from '@interfaces/user';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
  user?: IUser;
  login?: (user: IUser) => void;
  logout?: () => void;
}

const AuthContext = createContext<IAuthContext>({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const login = (user: IUser) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
