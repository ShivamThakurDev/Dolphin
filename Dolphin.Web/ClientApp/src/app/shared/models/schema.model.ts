export interface Board {
  id: string;
  title: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  talks: Talk[];
  collapsed?: boolean;
}

export interface Talk {
  id: string;
  text: string;
  speaker: string;
  tags?: string[];
  image?: string;
  issueType?: string;
  createdAt: Date;
}