import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';

import './App.scss';
import useAuthContext from './hooks/auth/useAuthContext';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import Title from './pages/Title/Title';
import ScrollToTop from './components/ScrollToTop';
import ErrorFallback from './components/UI/ErrorFallback/ErrorFallback';
import ScrollToTopButton from './components/UI/ScrollToTopButton/ScrollToTopButton';
import Spinner from './components/UI/Spinner/Spinner';

const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Account = lazy(() => import('./pages/Account/Account'));
const Watchlist = lazy(() => import('./pages/Watchlist/Watchlist'));

const App = () => {
  const { user, authIsReady } = useAuthContext();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        getNextPageParam: lastPage => {
          const totalPages =
            lastPage.total_pages < 500 ? lastPage.total_pages : 500;
          return lastPage.page === totalPages ? undefined : lastPage.page + 1;
        },
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <Suspense fallback={<Spinner isCentered />}>
                <ScrollToTop>
                  {authIsReady && (
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/filters' element={<Home />} />
                      <Route path='/search' element={<Results />} />
                      <Route path='/title/:id' element={<Title />} />
                      <Route
                        path='/login'
                        element={user ? <Navigate to='/' /> : <Login />}
                      />
                      <Route
                        path='/signup'
                        element={user ? <Navigate to='/' /> : <Signup />}
                      />
                      <Route
                        path='/reset-password'
                        element={user ? <Navigate to='/' /> : <ResetPassword />}
                      />
                      <Route
                        path='/account'
                        element={!user ? <Navigate to='/login' /> : <Account />}
                      />
                      <Route
                        path='/watchlist'
                        element={
                          !user ? <Navigate to='/login' /> : <Watchlist />
                        }
                      />
                      <Route path='/notfound' element={<NotFound />} />
                      <Route path='/*' element={<NotFound />} />
                    </Routes>
                  )}
                </ScrollToTop>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ScrollToTopButton />
    </div>
  );
};

export default App;
