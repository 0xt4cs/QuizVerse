import { Outlet } from 'react-router-dom';
import Navigation from './components/navigation/nav';
import { useAuth } from './context/AuthContext';
import FooterName from './components/footer/footerName';
import ErrorBoundary from './components/utils/ErrorBoundary';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && <Navigation />}
        <main className="flex-grow">
          <Outlet />
        </main>
        <FooterName />
      </div>
    </ErrorBoundary>
  );
}

export default App;
