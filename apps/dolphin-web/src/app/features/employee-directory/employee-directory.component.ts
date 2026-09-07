import { Component, inject } from '@angular/core';
import { EnterpriseDataTableComponent } from '../../shared/enterprise-data-table.component';
import { EmployeeDemoDataService } from '../employee/employee-demo-data.service';

@Component({
  selector: 'app-employee-directory',
  standalone: true,
  imports: [EnterpriseDataTableComponent],
  template: `
    <app-enterprise-data-table
      eyebrow="People operations"
      title="Employee Directory"
      primaryAction="Add Employee"
      rowKey="code"
      selectionLabelKey="name"
      [bulkActions]="['Assign manager', 'Export selected']"
      [columns]="data.directoryColumns"
      [rows]="data.directoryRows()">
    </app-enterprise-data-table>
  `
})
export class EmployeeDirectoryComponent {
  readonly data = inject(EmployeeDemoDataService);
}
