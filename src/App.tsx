import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Board from './pages/Board';

import {
  LogInCard,
  SignUpCard,
  ForgetPassword,
  ResetPassword,
} from './pages/Auth/AuthCards';

import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile/Profile';
import IndexPage from './pages/Index';
import { useEffect } from 'react';
import userUpdate from './util/userinfoUpdate';
import { ProjectListView } from './components';
import {
  AccountInfo,
  PersonalInfo,
  Settings,
} from './pages/Profile/ProfileSection';
import { DragAndDrop } from './components/DragAndDrop';
import { Calendar } from './components/Calendar';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/auth');
    } else {
      userUpdate(accessToken);
    }
  }, []);

  return (
    <>
      <Toaster />
      <Routes
      // location={location}
      // key={location.pathname}
      >
        {['/', '/:queryParams'].map((path) => (
          <Route
            key={path}
            path={path}
            element={<IndexPage />}
          />
        ))}
        <Route
          path='/board'
          element={<Board />}>
          <Route
            path='TaskList'
            element={<ProjectListView />}
          />
          <Route
            path='TaskColumn'
            element={
              <div>
                <DragAndDrop />
              </div>
            }
          />
          <Route
            path='TaskCalendar'
            element={
              <div>
                <Calendar />
              </div>
            }
          />
        </Route>
        <Route
          path='/auth'
          element={<Auth />}>
          <Route
            path='signUp'
            element={<SignUpCard />}
          />
          <Route
            path='logIn'
            element={<LogInCard />}
          />
          <Route
            path='forgetPassword'
            element={<ForgetPassword />}
          />
          <Route
            path='resetPassword'
            element={<ResetPassword />}
          />
        </Route>
        <Route
          path='/profile'
          element={<Profile />}>
          <Route
            path='personalInfo'
            element={<PersonalInfo />}
          />
          <Route
            path='accountInfo'
            element={<AccountInfo />}
          />
          <Route
            path='settings'
            element={<Settings />}
          />
          <Route
            path='*'
            element={<Navigate to='personalInfo' />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
