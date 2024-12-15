export interface task{
    id: string,
    createdOn: string,
    modifiedOn: string,
    modifiedBy: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    description: string,
    status: number,
    priority: number,
    progress: number,
    storyPoint: number,
    startDate: string,
    endDate: string
}