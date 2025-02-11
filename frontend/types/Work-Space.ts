export interface WorkSpace {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  assignedTo?: string;
  settings?: JSON;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  assignedTo?: string;
  status: string;
  deadline: Date;
}
