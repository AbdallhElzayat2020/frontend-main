import { createContext, useEffect, useState } from 'react';
const WS_URL = (import.meta as any).env.VITE_WS_URL;
// @ts-ignore
import EventEmitter from 'events';
import axios from 'axios';

class WebSocketHandler extends EventEmitter {
  send: (data: any) => void = () => {};

  constructor() {
    super();
  }
  setSend(sendFunction: (data: any) => void) {
    this.send = sendFunction;
  }
}

export const webSocket = new WebSocketHandler();
export const AppContext = createContext<{
  token: string | null;
  setToken: (newToken: string | null) => void;
  agent: string | null;
  setAgent: (newAgent: string | null) => void;
  // @ts-ignore
}>({});

function ContextProvider({ children }: any) {
  const [token, setTokenState] = useState<string | null>(null);
  const [agent, setAgent] = useState<string | null>(null);

  const setToken = (newToken: string | null) => {
    if (newToken === null) {
      localStorage.removeItem('token');
      axios.defaults.headers['Authorization'] = null;
      return setTokenState(null);
    }
    localStorage.setItem('token', newToken);
    axios.defaults.headers['Authorization'] = newToken;
    return setTokenState(newToken);
  };

  useEffect(() => {
    axios.interceptors.response.use(
      function (response: any) {
        // If the response is successful, just return it
        return response;
      },
      function (error: any) {
        // Check if the response status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          setToken(null);
        }
        return Promise.reject(error);
      }
    );
  });

  useEffect(() => {
    if (!token) return;
    console.log('connection to websocket with token ', token);
    // Initialize WebSocket connection
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    webSocket.setSend((data) => ws.send(data));

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      // @ts-ignore
      webSocket.emit('message', JSON.parse(event.data));
      // console.log("Message from server ", event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        agent,
        setAgent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
