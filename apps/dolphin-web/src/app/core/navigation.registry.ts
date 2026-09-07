import { AppModuleCard, IconName, NavigationItem, QuickAction } from '../shared/ui-models';

export interface ModuleRoute {
  id: string;
  label: string;
  route: string;
  icon: IconName;
  group: NavigationItem['group'];
  badge?: string;
  nav?: boolean;
  topTab?: boolean;
  placeholder?: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

export const MODULE_ROUTES: ModuleRoute[] = [
  { id: 'Home', label: 'Dashboard', route: '/dashboard', icon: 'layout', group: 'workspace' },
  { id: 'Inbox', label: 'Inbox', route: '/inbox', icon: 'inbox', group: 'workspace', badge: '4', placeholder: { title: 'Inbox workspace', description: 'Approvals, reminders and workflow tasks will land here with SLA-aware filters.', actionLabel: 'Configure inbox' } },
  { id: 'Attendance', label: 'Attendance', route: '/attendance', icon: 'clock', group: 'workspace', topTab: true },
  { id: 'Leave', label: 'Leave', route: '/leave', icon: 'calendar', group: 'workspace', topTab: true },
  { id: 'Apps', label: 'Apps', route: '/apps', icon: 'briefcase', group: 'workspace', topTab: true },
  { id: 'Me', label: 'My Profile', route: '/me', icon: 'user', group: 'people' },
  { id: 'Team', label: 'Employee Directory', route: '/team', icon: 'users', group: 'people' },
  { id: 'Finance', label: 'Payroll', route: '/finance', icon: 'dollar', group: 'operations', placeholder: { title: 'Payroll workspace', description: 'Payroll prechecks, payslips, reimbursements and accounting handoff will be managed here.', actionLabel: 'Design payroll flow' } },
  { id: 'Org', label: 'Organization', route: '/organization', icon: 'workflow', group: 'operations', placeholder: { title: 'Organization workspace', description: 'Company structure, locations, departments, shifts and policy setup will be configured here.', actionLabel: 'Map org structure' } },
  { id: 'Engage', label: 'Engage', route: '/engage', icon: 'activity', group: 'operations' },
  { id: 'Performance', label: 'Performance', route: '/performance', icon: 'chart', group: 'operations', topTab: true, placeholder: { title: 'Performance workspace', description: 'OKRs, KPIs, review cycles and calibration workflows are planned for this module.', actionLabel: 'Plan review cycle' } },
  { id: 'Expenses', label: 'Expenses', route: '/expenses', icon: 'dollar', group: 'operations', topTab: true, placeholder: { title: 'Expenses workspace', description: 'Claims, reimbursements, policy checks and finance approvals will be managed here.', actionLabel: 'Configure expense policy' } },
  { id: 'Helpdesk', label: 'Helpdesk', route: '/helpdesk', icon: 'inbox', group: 'operations', topTab: true, placeholder: { title: 'Helpdesk workspace', description: 'Employee tickets, HR service requests and internal SLAs will be tracked here.', actionLabel: 'Create request type' } },
  { id: 'Admin', label: 'Admin', route: '/admin', icon: 'shield', group: 'system', placeholder: { title: 'Admin workspace', description: 'Tenant settings, roles, permissions, audit visibility and module enablement belong here.', actionLabel: 'Open settings' } },
  { id: 'HRMS', label: 'HRMS Core', route: '/hrms', icon: 'users', group: 'workspace', nav: false, placeholder: { title: 'HRMS Core workspace', description: 'Employee self-service, attendance, leave, documents and assets are grouped here for tenant rollout.', actionLabel: 'Open HRMS setup' } },
  { id: 'CRM', label: 'CRM Lite', route: '/crm', icon: 'briefcase', group: 'operations', nav: false, placeholder: { title: 'CRM Lite workspace', description: 'Leads, customers, quotes and invoice handoffs are planned for the CRM app.', actionLabel: 'Plan CRM workflow' } },
  { id: 'Documents', label: 'Documents', route: '/documents', icon: 'file', group: 'operations', nav: false, placeholder: { title: 'Documents workspace', description: 'Policy center, signed forms, contracts and secure employee files will live here.', actionLabel: 'Design document flow' } },
  { id: 'Reports', label: 'BI Reports', route: '/reports', icon: 'chart', group: 'operations', nav: false, placeholder: { title: 'BI Reports workspace', description: 'Saved dashboards, analytics and exportable board packs are planned here.', actionLabel: 'Plan report pack' } },
  { id: 'ModuleRegistry', label: 'Module Registry', route: '/admin/modules', icon: 'settings', group: 'system', nav: false, placeholder: { title: 'Module Registry workspace', description: 'Tenant app metadata, plans, permissions and lifecycle controls will be governed here.', actionLabel: 'Configure registry' } }
];

export const PRIMARY_NAV_ITEMS: NavigationItem[] = MODULE_ROUTES
  .filter(route => ['workspace', 'people', 'operations', 'system'].includes(route.group))
  .filter(route => route.nav !== false)
  .filter(route => !route.topTab || ['Attendance', 'Leave', 'Apps'].includes(route.id))
  .map(route => ({
    id: route.id,
    label: route.id === 'Apps' ? 'App Launcher' : route.label,
    route: route.route,
    icon: route.icon,
    group: route.group,
    badge: route.badge
  }));

const TOP_TAB_ORDER = ['Attendance', 'Leave', 'Performance', 'Expenses', 'Helpdesk', 'Apps'];
export const TOP_TABS = TOP_TAB_ORDER
  .map(id => MODULE_ROUTES.find(route => route.id === id))
  .filter((route): route is ModuleRoute => Boolean(route));

export const COMMAND_ACTIONS: Array<QuickAction & { targetRoute: string }> = [
  { label: 'Web Clock-In', description: 'Log work hours by clocking in.', icon: 'calendar', tone: 'success', targetRoute: '/attendance' },
  { label: 'Web Clock-out', description: 'Finish today’s work session.', icon: 'clock', tone: 'neutral', targetRoute: '/attendance' },
  { label: 'Attendance', description: 'View and manage attendance.', icon: 'calendar', tone: 'info', targetRoute: '/attendance' },
  { label: 'Apply Leave', description: 'Request time-off.', icon: 'file', tone: 'brand', targetRoute: '/leave' },
  { label: 'Payslips', description: 'View and download payslips.', icon: 'dollar', tone: 'warning', targetRoute: '/finance' },
  { label: 'Leaves', description: 'View leave summary.', icon: 'activity', tone: 'brand', targetRoute: '/leave' },
  { label: 'Attendance Logs', description: 'Access detailed working-hour logs.', icon: 'calendar', tone: 'info', targetRoute: '/attendance' }
];

export const APP_MODULES: AppModuleCard[] = [
  { name: 'HRMS Core', description: 'Employee self-service, attendance, leave, assets and documents.', group: 'HRMS', icon: 'users', route: '/hrms', permissions: ['hrms.read'], enabled: true, plan: 'Starter' },
  { name: 'Finance Bridge', description: 'Payroll, reimbursement, invoices and accounting handoff.', group: 'Finance', icon: 'dollar', route: '/finance', permissions: ['finance.read'], enabled: true, plan: 'Growth' },
  { name: 'CRM Lite', description: 'Leads, customers, quotes and invoices for lean business teams.', group: 'CRM', icon: 'briefcase', route: '/crm', permissions: ['crm.read'], enabled: false, plan: 'Growth' },
  { name: 'Documents', description: 'Policy center, signed forms, contracts and secure employee files.', group: 'Operations', icon: 'file', route: '/documents', permissions: ['documents.read'], enabled: true, plan: 'Starter' },
  { name: 'BI Reports', description: 'Saved dashboards, operational analytics and exportable board packs.', group: 'Platform', icon: 'chart', route: '/reports', permissions: ['reports.read'], enabled: false, plan: 'Enterprise' },
  { name: 'Module Registry', description: 'Tenant-enabled app metadata, plans, permissions and lifecycle.', group: 'Platform', icon: 'settings', route: '/admin/modules', permissions: ['admin.modules'], enabled: true, plan: 'Enterprise' }
];
