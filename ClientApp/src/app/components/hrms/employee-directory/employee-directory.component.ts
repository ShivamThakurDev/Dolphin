import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HrmsService, EmployeeModel } from '../../../services/hrms.service';

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrl: './employee-directory.component.css'
})
export class EmployeeDirectoryComponent implements OnInit {
  displayedColumns: string[] = ['employeeCode', 'fullName', 'workEmail', 'status', 'actions'];
  dataSource = new MatTableDataSource<EmployeeModel>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hrmsService: HrmsService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.hrmsService.getEmployees(1, 50).subscribe({
      next: (res: any) => {
        const items = res?.items || res || [];
        this.dataSource = new MatTableDataSource<EmployeeModel>(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
