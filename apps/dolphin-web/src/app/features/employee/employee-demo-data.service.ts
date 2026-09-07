import { Injectable, signal } from '@angular/core';
import { AssetRow, EmployeeRow, TableColumn, Tone } from '../../shared/ui-models';

export interface DocumentRecord {
  name: string;
  count: number;
  updated: string;
  status: string;
  tone: Tone;
}

export interface EmployeeTimelineItem {
  title: string;
  meta: string;
}

export interface EmployeeProfileView {
  name: string;
  initials: string;
  role: string;
  department: string;
  location: string;
  status: 'Active' | 'Remote' | 'On Leave';
  profileHealth: number;
  profileHealthSummary: string;
  manager: {
    name: string;
    initials: string;
    role: string;
  };
  email: string;
  joined: string;
  documents: DocumentRecord[];
  timeline: EmployeeTimelineItem[];
}

@Injectable({ providedIn: 'root' })
export class EmployeeDemoDataService {
  readonly directoryColumns: TableColumn<EmployeeRow>[] = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'risk', label: 'Risk', type: 'risk' }
  ];

  readonly directoryRows = signal<EmployeeRow[]>([
    { code: 'DOL-001', name: 'Shivam Kumar', role: 'Jr. Software Engineer', department: 'Engineering', location: 'Mohali', status: 'Active', risk: 'Low' },
    { code: 'DOL-002', name: 'Anjali Sharma', role: 'HR Business Partner', department: 'HR', location: 'Remote', status: 'Remote', risk: 'Low' },
    { code: 'DOL-003', name: 'Sudhir Kumar', role: 'Engineering Manager', department: 'Engineering', location: 'Mohali', status: 'Active', risk: 'Medium' },
    { code: 'DOL-004', name: 'Nikhil Kumar', role: 'Lead Developer', department: 'Engineering', location: 'Mohali', status: 'On Leave', risk: 'Low' },
    { code: 'DOL-005', name: 'Sonali Thakur', role: 'Recruiter', department: 'Talent', location: 'Chandigarh', status: 'Active', risk: 'Low' },
    { code: 'DOL-006', name: 'Ariel Admin', role: 'Finance Executive', department: 'Finance', location: 'Mohali', status: 'Active', risk: 'High' },
    { code: 'DOL-007', name: 'Priya Mehra', role: 'QA Engineer', department: 'Quality', location: 'Remote', status: 'Remote', risk: 'Medium' }
  ]);

  readonly assetColumns: TableColumn<AssetRow>[] = [
    { key: 'type', label: 'Type' },
    { key: 'asset', label: 'Asset' },
    { key: 'category', label: 'Category' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'condition', label: 'Condition', type: 'status' }
  ];

  readonly assetRows = signal<AssetRow[]>([
    { type: 'Laptop', asset: 'HP EliteBook i7', category: 'Computer Hardware', assigned: '15 Jul 2025', condition: 'Good' },
    { type: 'Mouse', asset: 'Mouse Dell', category: 'Computer Hardware', assigned: '15 Jul 2025', condition: 'Good' },
    { type: 'Access Card', asset: 'HQ Access', category: 'Facilities', assigned: '16 Jul 2025', condition: 'Review' }
  ]);

  readonly profile = signal<EmployeeProfileView>({
    name: 'Shivam Kumar',
    initials: 'S',
    role: 'Jr. Software Engineer',
    department: 'Engineering',
    location: 'Mohali',
    status: 'Active',
    profileHealth: 84,
    profileHealthSummary: 'Most core records are complete. Previous experience is pending HR review.',
    manager: {
      name: 'Sudhir Kumar',
      initials: 'S',
      role: 'Engineering Manager'
    },
    email: 'shivam@dolphin.local',
    joined: '15 Jul 2025',
    documents: [
      { name: 'Degrees & Certificates', count: 1, updated: 'Updated today', status: 'Verified', tone: 'success' },
      { name: 'Previous Experience', count: 1, updated: 'Updated 2d ago', status: 'Review', tone: 'warning' },
      { name: 'Acknowledgements', count: 2, updated: 'Updated 5d ago', status: 'Signed', tone: 'brand' }
    ],
    timeline: [
      { title: 'Asset acknowledged', meta: 'HP EliteBook i7 · Today' },
      { title: 'Profile updated', meta: 'Contact details · Yesterday' },
      { title: 'Leave policy assigned', meta: 'Earned Leave · 5 days ago' }
    ]
  });
}
