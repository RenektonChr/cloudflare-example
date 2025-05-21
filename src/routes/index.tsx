import React from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Approval from '../pages/Approval';
import Attendance from '../pages/Attendance';
import Employee from '../pages/Employee';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import AIAgent from '../pages/AIAgent';
import PrivateRoute from './PrivateRoute';

// 定义路由配置
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'approval',
        element: <Approval />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'employee',
        element: <Employee />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'ai-agent',
        element: <AIAgent />,
      },
    ],
  },
]; 