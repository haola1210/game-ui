import { IPlayer } from '@interfaces/player';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
  user?: IPlayer;
  login?: (user: IPlayer) => void;
  logout?: () => void;
}

const AuthContext = createContext<IAuthContext>({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IPlayer | undefined>(undefined);

  const login = (user: IPlayer) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
