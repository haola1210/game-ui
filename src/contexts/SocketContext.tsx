import {
  createContext,
  useEffect,
  type ReactNode,
  useRef,
  type MutableRefObject,
  useContext,
  useState,
} from 'react';
import { type Socket, io } from 'socket.io-client';

const SocketContext = createContext<MutableRefObject<Socket | undefined> | undefined>(undefined);

export default function SocketContextProvider({ children }: { children: ReactNode }) {
  const socket = useRef<Socket | undefined>(undefined);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.current = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    socket.current?.on('connect', () => {
      console.log('Socket successfully connected', socket.current?.id);
      setConnected(true);
    });

    socket.current?.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    const handler = () => {
      socket.current?.off();
      socket.current?.disconnect();
    };

    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
      handler();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{connected ? children : <></>}</SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);
