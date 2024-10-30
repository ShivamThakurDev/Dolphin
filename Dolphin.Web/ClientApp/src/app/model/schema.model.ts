export interface Tag{
    name: string;
    color?: string;
}

export interface Talk {
    text: string;
    speaker?: string;
    tags?: Tag[];
    image?: string;
    createdAt?: Date;
    issueType?: IssueType;
}

export enum IssueType{
    Task = 'task',
    SubTask = 'sub-task',
    Bug = 'bug',
    Epic = 'epic',
    Story = 'story'
}

export interface Track{
    title: string;
    talks: Talk[];
    id: string;
    collapsed: boolean;
}

export interface Board {
    title: string;
    tracks: Track[];
}