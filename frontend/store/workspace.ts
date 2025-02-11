// store/workspaceStore.ts
import { TeamManager } from '@/types/Team-Manager'
import { WorkSpace } from '@/types/Work-Space'
import { create } from 'zustand'


interface WorkSpaceStore {
  workspaces: WorkSpace[]
  setWorkspaces: (workspaces: WorkSpace[]) => void
  selectedWorkspace: WorkSpace | null
  setSelectedWorkspace: (workspace: WorkSpace | null) => void
  teamManagers: TeamManager[]
  setTeamManagers: (managers: TeamManager[]) => void
}

export const useWorkspaceStore = create<WorkSpaceStore>((set) => ({
  workspaces: [],
  // Modify setWorkspaces to be more defensive
  setWorkspaces: (workspaces) => {
    set((state) => {
      if (JSON.stringify(state.workspaces) === JSON.stringify(workspaces)) {
        return state // Return same state if data hasn't changed
      }
      return { ...state, workspaces }
    })
  },
  selectedWorkspace: null,
  setSelectedWorkspace: (workspace) => set((state) => ({ ...state, selectedWorkspace: workspace })),
  teamManagers: [],
  setTeamManagers: (managers) => set((state) => ({ ...state, teamManagers: managers }))
}))