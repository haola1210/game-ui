import { BrowserRouter } from 'react-router-dom';
import RouteContainer from './routes';
import { AuthContextProvider } from '@contexts/useAuthContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
