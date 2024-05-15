import {
  createContext,
  useEffect,
  type ReactNode,
  useRef,
  type MutableRefObject,
  useContext,
} from 'react';
import { type Socket, io } from 'socket.io-client';

const SocketContext = createContext<MutableRefObject<Socket | undefined> | undefined>(undefined);

export default function SocketContextProvider({ children }: { children: ReactNode }) {
  const socket = useRef<Socket | undefined>(undefined);

  useEffect(() => {
    socket.current = io('http://localhost:3001');

    socket.current?.on('connect', () => {
      console.log('Socket successfully connected');
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.current?.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export const useSocketContext = () => useContext(SocketContext);
