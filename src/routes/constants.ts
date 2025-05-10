export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  APPROVAL: '/approval',
  ATTENDANCE: '/attendance',
  EMPLOYEE: '/employee',
  PROFILE: '/profile',
  LOGIN: '/login',
} as const;

// 路由配置类型
export type RouteKey = keyof typeof ROUTES;

// 路由标题映射
export const ROUTE_TITLES: Record<RouteKey, string> = {
  ROOT: '首页',
  DASHBOARD: '工作台',
  APPROVAL: '审批管理',
  ATTENDANCE: '考勤管理',
  EMPLOYEE: '员工管理',
  PROFILE: '个人中心',
  LOGIN: '登录',
}; 