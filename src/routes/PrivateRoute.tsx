import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // 这里可以添加权限验证逻辑
  const isAuthenticated = true; // 示例：假设用户已登录

  if (!isAuthenticated) {
    // 如果未登录，重定向到登录页面
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 