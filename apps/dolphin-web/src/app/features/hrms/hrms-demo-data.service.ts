import { Injectable, signal } from '@angular/core';
import { AttendanceLogRow, FeedPost, LeaveBalanceCard, LeaveHistoryRow, TableColumn } from '../../shared/ui-models';

export interface FeatureViewState<T> {
  loading: boolean;
  error?: string;
  permissionDenied?: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class HrmsDemoDataService {
  readonly attendanceColumns: TableColumn<AttendanceLogRow>[] = [
    { key: 'date', label: 'Date' },
    { key: 'visual', label: 'Attendance visual' },
    { key: 'effectiveHours', label: 'Effective hours' },
    { key: 'breakTaken', label: 'Break taken' },
    { key: 'grossHours', label: 'Gross hours' },
    { key: 'arrival', label: 'Arrival' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'log', label: 'Log', type: 'status' }
  ];

  readonly leaveHistoryColumns: TableColumn<LeaveHistoryRow>[] = [
    { key: 'date', label: 'Date' },
    { key: 'leaveType', label: 'Leave type' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'approver', label: 'Approver' },
    { key: 'requestedBy', label: 'Requested by' },
    { key: 'reason', label: 'Reason' }
  ];

  readonly attendanceLogs = signal<FeatureViewState<AttendanceLogRow[]>>({
    loading: false,
    data: [
      { date: 'Fri, 29 May', visual: 'Remote · synced', effectiveHours: '8h 52m', breakTaken: '0h 28m', grossHours: '9h 20m', arrival: 'On Time', status: 'WFH', log: 'Good' },
      { date: 'Thu, 28 May', visual: 'Office · complete', effectiveHours: '9h 06m', breakTaken: '0h 12m', grossHours: '9h 18m', arrival: 'On Time', status: 'On Time', log: 'Good' },
      { date: 'Wed, 27 May', visual: 'Office · complete', effectiveHours: '8h 31m', breakTaken: '0h 32m', grossHours: '9h 03m', arrival: 'On Time', status: 'On Time', log: 'Good' },
      { date: 'Tue, 26 May', visual: 'Exception · short hours', effectiveHours: '5h 08m', breakTaken: '0h 35m', grossHours: '5h 43m', arrival: 'On Time', status: 'Penalty', log: 'Warning' },
      { date: 'Mon, 25 May', visual: 'Office · complete', effectiveHours: '8h 59m', breakTaken: '0h 07m', grossHours: '9h 06m', arrival: 'On Time', status: 'On Time', log: 'Good' },
      { date: 'Sun, 24 May', visual: 'Weekly off', effectiveHours: 'Full day weekly-off', breakTaken: '-', grossHours: '-', arrival: '-', status: 'W-OFF', log: 'Review' },
      { date: 'Sat, 23 May', visual: 'Weekly off', effectiveHours: 'Full day weekly-off', breakTaken: '-', grossHours: '-', arrival: '-', status: 'W-OFF', log: 'Review' },
      { date: 'Fri, 22 May', visual: 'Paid leave', effectiveHours: 'Paid Leave', breakTaken: '-', grossHours: '-', arrival: '-', status: 'Leave', log: 'Good' }
    ]
  });

  readonly leaveBalances = signal<FeatureViewState<LeaveBalanceCard[]>>({
    loading: false,
    data: [
      { name: 'Marriage Leave', available: '10 days', consumed: '0 day', quota: '10 days', tone: 'danger', progress: 82 },
      { name: 'Paid Leave', available: '1 day', consumed: '5 days', quota: '12 days', tone: 'success', progress: 36 },
      { name: 'Comp Offs', available: '0 day', consumed: '0 day', quota: '0 day', tone: 'neutral', progress: 0 },
      { name: 'Unpaid Leave', available: '∞', consumed: '0 day', quota: '∞', tone: 'info', progress: 12 }
    ]
  });

  readonly leaveHistory = signal<FeatureViewState<LeaveHistoryRow[]>>({
    loading: false,
    data: [
      { date: '14 May 2026', leaveType: 'Paid Leave · 1 day', status: 'Approved', approver: 'Manita Pradhan', requestedBy: 'Shivam', reason: 'Still experiencing symptoms and would like to rest.' },
      { date: '28 Apr 2026', leaveType: 'Paid Leave · 0.5 day', status: 'Approved', approver: 'Attendance Policy', requestedBy: 'Penalisation Policy', reason: 'Leave deducted as gross hours were short.' },
      { date: '27 Mar 2026', leaveType: 'Paid Leave · 1 day', status: 'Approved', approver: 'Sudhir Kumar', requestedBy: 'Shivam', reason: 'Planned leave.' },
      { date: '13 Mar 2026', leaveType: 'Paid Leave · first half', status: 'Approved', approver: 'Sudhir Kumar', requestedBy: 'Shivam', reason: 'Requesting leave for first half of the day.' },
      { date: '10 Mar 2026', leaveType: 'Paid Leave · first half', status: 'Approved', approver: 'Sudhir Kumar', requestedBy: 'Shivam', reason: 'Motion sickness.' }
    ]
  });

  readonly feedPosts = signal<FeatureViewState<FeedPost[]>>({
    loading: false,
    data: [
      { author: 'Manita Pradhan', role: 'HR Admin', age: '2 days ago', body: 'Your journey reflects dedication, hard work and loyalty. Thank you for building with us.', imageTitle: 'Happy 8th Work Anniversary', reactions: 9, comments: 0, tone: 'brand' },
      { author: 'Sonali Thakur', role: 'People Ops', age: '11 days ago', body: 'Payroll precheck is open. Managers should clear attendance exceptions before Friday evening.', reactions: 14, comments: 3, tone: 'warning' },
      { author: 'Dolphin AI', role: 'Assistant', age: '1 hour ago', body: 'Weekly HR health summary is ready for authorized HR users.', reactions: 7, comments: 1, tone: 'info' }
    ]
  });
}
