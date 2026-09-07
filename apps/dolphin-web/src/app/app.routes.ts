import { Routes } from '@angular/router';
import { authGuard, otpGuard } from './core/auth.guard';
import { ShellLayoutComponent } from './layout/shell-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'otp',
    canActivate: [otpGuard],
    loadComponent: () => import('./features/auth/otp-verify.component').then(m => m.OtpVerifyComponent)
  },
  {
    path: '',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/bento-dashboard.component').then(m => m.BentoDashboardComponent), data: { moduleId: 'Home' } },
      { path: 'me', loadComponent: () => import('./features/employee-profile/employee-profile.component').then(m => m.EmployeeProfileComponent), data: { moduleId: 'Me' } },
      { path: 'team', loadComponent: () => import('./features/employee-directory/employee-directory.component').then(m => m.EmployeeDirectoryComponent), data: { moduleId: 'Team' } },
      { path: 'attendance', loadComponent: () => import('./features/hrms/attendance-workspace.component').then(m => m.AttendanceWorkspaceComponent), data: { moduleId: 'Attendance' } },
      { path: 'leave', loadComponent: () => import('./features/hrms/leave-workspace.component').then(m => m.LeaveWorkspaceComponent), data: { moduleId: 'Leave' } },
      { path: 'engage', loadComponent: () => import('./features/hrms/company-feed.component').then(m => m.CompanyFeedComponent), data: { moduleId: 'Engage' } },
      { path: 'apps', loadComponent: () => import('./features/app-platform/app-launcher.component').then(m => m.AppLauncherComponent), data: { moduleId: 'Apps' } },
      { path: 'hrms', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'HRMS' } },
      { path: 'inbox', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Inbox' } },
      { path: 'finance', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Finance' } },
      { path: 'crm', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'CRM' } },
      { path: 'documents', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Documents' } },
      { path: 'reports', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Reports' } },
      { path: 'organization', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Org' } },
      { path: 'performance', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Performance' } },
      { path: 'expenses', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Expenses' } },
      { path: 'helpdesk', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Helpdesk' } },
      { path: 'admin/modules', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'ModuleRegistry' } },
      { path: 'admin', loadComponent: () => import('./features/platform/module-placeholder.component').then(m => m.ModulePlaceholderComponent), data: { moduleId: 'Admin' } }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
