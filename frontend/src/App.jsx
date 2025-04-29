import { Outlet } from 'react-router-dom';
import Navigation from './components/navigation/nav';
import { useAuth } from './context/AuthContext';
import FooterName from './components/footer/footerName';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Navigation />}
      <main className="flex-grow">
         <Outlet />
      </main>
      <FooterName />
    </div>
  );
}

export default App;
