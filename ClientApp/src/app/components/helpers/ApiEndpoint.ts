import { environment } from "../../../environments/environment";

export class ApiEndpoint {
  public static readonly baseUrl = environment.baseUrl;

  // Tasks & Projects
  public static readonly tasks = `${environment.baseUrl}tasks`;
  public static readonly getAllTasks = `${environment.baseUrl}tasks/all`;
  public static readonly addTask = `${environment.baseUrl}tasks`;
  public static readonly editTask = `${environment.baseUrl}tasks`;
  public static readonly deleteTask = `${environment.baseUrl}tasks`;

  // Agencies
  public static readonly agencies = `${environment.baseUrl}agencies`;
  public static readonly getAllAgencies = `${environment.baseUrl}agencies/all`;

  // HRMS Core
  public static readonly employees = `${environment.baseUrl}employees`;
  public static readonly attendance = `${environment.baseUrl}attendance`;
  public static readonly attendanceClockIn = `${environment.baseUrl}attendance/clock-in`;
  public static readonly leave = `${environment.baseUrl}leave`;
  public static readonly dashboard = `${environment.baseUrl}dashboard`;
  public static readonly announcements = `${environment.baseUrl}announcements`;

  // Identity / Auth
  public static readonly authLogin = `${environment.baseUrl}auth/login`;
  public static readonly authRefresh = `${environment.baseUrl}auth/refresh`;
  public static readonly getAllUsers = `${environment.baseUrl}User/GetAll`;
  public static readonly assignRole = `${environment.baseUrl}User/AssignRole`;
  public static readonly registerUser = `${environment.baseUrl}User/Register`;
  public static readonly getAllRoles = `${environment.baseUrl}Role/GetAll`;
  public static readonly addRole = `${environment.baseUrl}Role/Add`;
  public static readonly editRole = `${environment.baseUrl}Role/Edit`;
  public static readonly deleteRole = `${environment.baseUrl}Role/Delete`;
}
