export interface task {
    id: string;
    createdOn?: string;
    modifiedOn?: string;
    modifiedBy?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    name: string;
    title?: string;
    description: string;
    status: number | string;
    priority: number | string;
    progress: number;
    progressPercentage?: number;
    storyPoint: number;
    storyPoints?: number;
    startDate: string;
    endDate: string;
    dueDate?: string;
    parentTaskId?: string;
    parentId?: string;
    assignedEmployeeId?: string;
    assignedEmployeeName?: string;
    agencyId?: string;
    agencyName?: string;
    isAssigneeOnLeave?: boolean;
    leaveReturnDate?: string;
    hasConflict?: boolean;
}