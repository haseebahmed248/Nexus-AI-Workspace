



export interface TeamManager {
    id: string
    name: string
    email: string
}


export interface AssignTeamManagerDTO{
    id?: string,
    email: string,
    teamName: string,
    role?: string
}