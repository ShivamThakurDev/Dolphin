export type IconName =
  | 'activity' | 'archive' | 'bell' | 'bot' | 'briefcase' | 'calendar' | 'chart' | 'check'
  | 'chevron-left' | 'chevron-right' | 'clock' | 'command' | 'dollar' | 'download'
  | 'file' | 'filter' | 'home' | 'inbox' | 'layout' | 'menu' | 'moon' | 'more'
  | 'plus' | 'search' | 'send' | 'settings' | 'shield' | 'sparkles' | 'sun' | 'upload'
  | 'user' | 'users' | 'workflow' | 'x';

export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'brand' | 'info';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: IconName;
  group: 'workspace' | 'people' | 'operations' | 'system';
  badge?: string;
}

export interface KpiMetric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
  icon: IconName;
  tone: Tone;
}

export interface QuickAction {
  label: string;
  description: string;
  icon: IconName;
  tone: Tone;
}

export interface ActivityItem {
  actor: string;
  action: string;
  meta: string;
  tone: Tone;
}

export interface EmployeeRow {
  code: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: 'Active' | 'Remote' | 'On Leave';
  risk: 'Low' | 'Medium' | 'High';
}

export interface AssetRow {
  type: string;
  asset: string;
  category: string;
  assigned: string;
  condition: 'Good' | 'Review';
}

export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  type?: 'text' | 'status' | 'risk' | 'actions';
}

export interface AppModuleCard {
  name: string;
  description: string;
  group: 'HRMS' | 'Finance' | 'CRM' | 'Operations' | 'Platform';
  icon: IconName;
  route: string;
  permissions: string[];
  enabled: boolean;
  plan: 'Starter' | 'Growth' | 'Enterprise';
}

export interface AttendanceLogRow {
  date: string;
  visual: string;
  effectiveHours: string;
  breakTaken: string;
  grossHours: string;
  arrival: string;
  log: 'Good' | 'Warning' | 'Review';
  status: 'On Time' | 'WFH' | 'W-OFF' | 'Leave' | 'Penalty';
}

export interface LeaveBalanceCard {
  name: string;
  available: string;
  consumed: string;
  quota: string;
  tone: Tone;
  progress: number;
}

export interface LeaveHistoryRow {
  date: string;
  leaveType: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  approver: string;
  requestedBy: string;
  reason: string;
}

export interface FeedPost {
  author: string;
  role: string;
  age: string;
  body: string;
  imageTitle?: string;
  reactions: number;
  comments: number;
  tone: Tone;
}
