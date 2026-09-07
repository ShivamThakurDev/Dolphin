import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HrmsService } from '../../../services/hrms.service';
import { AuthService } from '../../../services/auth.service';

export interface DashboardTask {
  code: string;
  title: string;
  status: string;
  statusType: 'in-progress' | 'blocked' | 'review' | 'todo' | 'done';
  progress: number;
  storyPoint: number;
  assignee: {
    initials: string;
    name: string;
    presence: 'office' | 'leave' | 'remote';
    color: string;
  };
  dueDate: string;
  hasConflict: boolean;
  conflictText?: string;
  id?: string;
  description?: string;
}

export interface TeamMemberItem {
  initials: string;
  name: string;
  presence: 'office' | 'leave' | 'remote';
  color: string;
}

@Component({
  selector: 'app-bento-dashboard',
  templateUrl: './bento-dashboard.component.html',
  styleUrl: './bento-dashboard.component.css'
})
export class BentoDashboardComponent implements OnInit, OnDestroy {
  isLoading = false;

  // Digital session clock
  currentTime = '5:35:58 pm';
  private clockInterval: any;

  // Team HR Pulse Members
  teamMembers: TeamMemberItem[] = [
    { initials: 'SK', name: 'Sarah', presence: 'office', color: 'linear-gradient(135deg, #0d9488, #14b8a6)' },
    { initials: 'JD', name: 'Jane', presence: 'leave', color: 'linear-gradient(135deg, #2563eb, #3b82f6)' },
    { initials: 'MR', name: 'Mike', presence: 'remote', color: 'linear-gradient(135deg, #059669, #10b981)' },
    { initials: 'EB', name: 'Emily', presence: 'office', color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { initials: 'DL', name: 'David', presence: 'remote', color: 'linear-gradient(135deg, #0284c7, #06b6d4)' }
  ];

  // Sprint Velocity & Health Metrics
  sprintPercentage = 79;
  pointsDone = 54;
  pointsLeft = 14;
  velocityPoints = 68;
  avgLast4 = 58;
  conflictsCount = '1 PTO';

  // Swim-stream Tasks matching exact design specifications
  tasks: DashboardTask[] = [
    {
      code: 'DLP-42',
      title: 'Consolidate Angular 18 Spatial ClientApp',
      status: 'In Progress',
      statusType: 'in-progress',
      progress: 75,
      storyPoint: 8,
      assignee: { initials: 'SK', name: 'Sarah Kumar', presence: 'office', color: 'linear-gradient(135deg, #0d9488, #14b8a6)' },
      dueDate: 'Due Fri, Sep 11',
      hasConflict: false,
      id: 'DLP-42',
      description: 'Integrate Liquid Bento spatial UI tokens and clean theme architecture'
    },
    {
      code: 'DLP-43',
      title: 'EF Core Migration & Seeder',
      status: 'Blocked',
      statusType: 'blocked',
      progress: 40,
      storyPoint: 13,
      assignee: { initials: 'JD', name: 'Jane Doe', presence: 'leave', color: 'linear-gradient(135deg, #2563eb, #3b82f6)' },
      dueDate: 'Due Tomorrow',
      hasConflict: true,
      conflictText: '⚠ PTO Conflict',
      id: 'DLP-43',
      description: 'Run initial migration and seeds; assignee is on approved PTO'
    },
    {
      code: 'DLP-44',
      title: 'Bridge Avatar presence tooltips',
      status: 'Review',
      statusType: 'review',
      progress: 90,
      storyPoint: 5,
      assignee: { initials: 'MR', name: 'Mike Ross', presence: 'remote', color: 'linear-gradient(135deg, #059669, #10b981)' },
      dueDate: 'Due Thu, Sep 10',
      hasConflict: false,
      id: 'DLP-44',
      description: 'Verify dynamic presence indicators across sprint lanes'
    },
    {
      code: 'DLP-45',
      title: 'Leave approval workflow v2',
      status: 'To Do',
      statusType: 'todo',
      progress: 0,
      storyPoint: 5,
      assignee: { initials: 'EB', name: 'Emily Blunt', presence: 'office', color: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
      dueDate: 'Due Mon, Sep 14',
      hasConflict: false,
      id: 'DLP-45',
      description: 'Enable manager multi-level leave approval chains'
    },
    {
      code: 'DLP-46',
      title: 'Sprint velocity burn-up telemetry',
      status: 'Done',
      statusType: 'done',
      progress: 100,
      storyPoint: 8,
      assignee: { initials: 'DL', name: 'David Lee', presence: 'remote', color: 'linear-gradient(135deg, #0284c7, #06b6d4)' },
      dueDate: 'Due Mon, Sep 7',
      hasConflict: false,
      id: 'DLP-46',
      description: 'Track burn-up metrics and live velocity points'
    }
  ];

  // Drawer management
  selectedTask: any = null;
  isDrawerOpen = false;

  constructor(
    private taskService: TaskService,
    private hrmsService: HrmsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.startClock();
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  private startClock(): void {
    this.updateClock();
    this.clockInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  private updateClock(): void {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    this.currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  loadData(): void {
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        const list = res?.items || (Array.isArray(res) ? res : []);
        if (list.length > 0) {
          list.forEach((backendTask: any) => {
            const exists = this.tasks.find(t => t.id === backendTask.id || t.code === backendTask.name);
            if (!exists && backendTask.name) {
              this.tasks.push({
                code: `DLP-${this.tasks.length + 42}`,
                title: backendTask.name || backendTask.title,
                status: backendTask.status === 2 ? 'Done' : (backendTask.status === 1 ? 'In Progress' : 'To Do'),
                statusType: backendTask.status === 2 ? 'done' : (backendTask.status === 1 ? 'in-progress' : 'todo'),
                progress: backendTask.progress || 0,
                storyPoint: backendTask.storyPoint || 5,
                assignee: { initials: 'SK', name: backendTask.assignedEmployeeName || 'Sarah Kumar', presence: 'office', color: 'linear-gradient(135deg, #0d9488, #14b8a6)' },
                dueDate: 'Due Soon',
                hasConflict: backendTask.isAssigneeOnLeave === true,
                id: backendTask.id,
                description: backendTask.description
              });
            }
          });
        }
      },
      error: () => {}
    });
  }

  openTaskDrawer(task: DashboardTask): void {
    this.selectedTask = {
      id: task.code || task.id,
      name: task.title,
      description: task.description || 'Sprint task item for unified ERP delivery',
      storyPoint: task.storyPoint,
      progress: task.progress,
      status: task.status,
      assignedEmployeeName: task.assignee.name,
      hasLeaveConflict: task.hasConflict,
      leaveReturnDate: task.hasConflict ? 'Sep 12' : null
    };
    this.isDrawerOpen = true;
  }

  closeTaskDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedTask = null;
  }

  onTaskUpdated(updatedTask: any): void {
    const idx = this.tasks.findIndex(t => t.code === updatedTask.id || t.id === updatedTask.id);
    if (idx !== -1) {
      const statusStr = updatedTask.status === 2 ? 'Done' : (updatedTask.status === 1 ? 'In Progress' : (updatedTask.status === 0 ? 'To Do' : updatedTask.status));
      const statusType: 'in-progress' | 'blocked' | 'review' | 'todo' | 'done' =
        statusStr === 'Done' ? 'done' : (statusStr === 'In Progress' ? 'in-progress' : (statusStr === 'Blocked' ? 'blocked' : (statusStr === 'Review' ? 'review' : 'todo')));
      this.tasks[idx] = {
        ...this.tasks[idx],
        title: updatedTask.name || this.tasks[idx].title,
        status: statusStr,
        statusType: statusType,
        progress: updatedTask.progress ?? this.tasks[idx].progress
      };
    }
  }

  openNewTask(): void {
    this.selectedTask = {
      id: `DLP-${this.tasks.length + 42}`,
      name: '',
      description: '',
      storyPoint: 5,
      progress: 0,
      status: 'Todo',
      assignedEmployeeName: 'Sarah Kumar',
      hasLeaveConflict: false
    };
    this.isDrawerOpen = true;
  }
}
