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
    story_Point: number,
    start_Date: string,
    end_Date: string
}