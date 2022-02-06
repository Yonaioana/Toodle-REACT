import { useState, useContext, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthContext from './utils/AuthContext';
import { auth } from './components/components/firebase';
import './styles/Board.css'

import Header from './pages/Header';
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MyProfile = lazy(() => import('./pages/MyProfile'));

export default function App() {
  const [isAuthenticated, setAuthentication] = useState(useContext(AuthContext));
  if (process.env.NODE_ENV === 'development') console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged(user => {
      user ?
        setAuthentication(true) :
        setAuthentication(false);
      unsubscribe();
    });
  }, []);

  function renderHome() {
    if (isAuthenticated === false) {
      return <Register />;
    } else if (isAuthenticated === true) {
      return <MyProfile />;
    } else {
      return null;
    }
  }

  return (
    <div className='dashboard'>
      <AuthContext.Provider value={[isAuthenticated, setAuthentication]}>
            <Router>
              <Header />
              <Suspense fallback={null}>
                <Switch>
                  <Route exact path='/'>{renderHome()}</Route>
                  <Route path='/login'><Login /></Route>
                  <Route path='/register'><Register /></Route>
                  <Route path='*'><Redirect to='/' /></Route>
                </Switch>
              </Suspense>
              <Toaster
                gutter={16}
                position="top-right"
                containerStyle={{ top: 88 }}
              />
            </Router>
          </AuthContext.Provider>
    </div>
  );
}
