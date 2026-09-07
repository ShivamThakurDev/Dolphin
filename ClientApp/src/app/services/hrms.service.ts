import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';

export interface EmployeeModel {
  id: string;
  employeeCode: string;
  fullName: string;
  workEmail: string;
  departmentName?: string;
  designationName?: string;
  status: number;
}

export interface AttendanceModel {
  id: string;
  employeeId: string;
  workDate: string;
  clockIn: string;
  clockOut?: string;
  status: number;
}

export interface LeaveRequestModel {
  id: string;
  employeeId: string;
  from: string;
  to: string;
  reason: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class HrmsService {
  constructor(private http: HttpClient) {}

  getEmployees(page = 1, pageSize = 20): Observable<any> {
    return this.http.get<any>(`${ApiEndpoint.employees}?pageNumber=${page}&pageSize=${pageSize}`);
  }

  createEmployee(employee: { employeeCode: string; firstName: string; lastName: string; workEmail: string }): Observable<any> {
    return this.http.post<any>(ApiEndpoint.employees, employee);
  }

  clockIn(employeeId: string): Observable<AttendanceModel> {
    return this.http.post<AttendanceModel>(ApiEndpoint.attendanceClockIn, { employeeId });
  }

  applyLeave(leave: { employeeId: string; leavePolicyId: string; from: string; to: string; reason: string }): Observable<LeaveRequestModel> {
    return this.http.post<LeaveRequestModel>(ApiEndpoint.leave, leave);
  }

  getDashboard(): Observable<any> {
    return this.http.get<any>(ApiEndpoint.dashboard);
  }
}
