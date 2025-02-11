'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/modal/Modal'
import { DataTable } from '@/components/ui/table/DataTable'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Edit, Trash, Layers, UserPlus2 } from 'lucide-react'
import { AssignManagerModal } from './AssignManagerModal'
import { useForm } from 'react-hook-form'
import { assignTeamManager, getTeamManagers } from '@/lib/api/team-manager'
import { getWorkSpaces } from '@/lib/api/work-space'
import { useWorkspaceStore } from '@/store/workspace'
import React, { useEffect } from 'react'
import { WorkSpace } from '@/types/Work-Space'

interface WorkSpaceResponse {
  data: WorkSpace[]
}

interface WorkSpaceFormData {
  name: string
  description: string
}

function WorkSpaceTable() {
  const queryClient = useQueryClient()
  
  // Zustand state
  const { 
    selectedWorkspace, 
    setSelectedWorkspace,
    teamManagers,
    setTeamManagers 
  } = useWorkspaceStore()

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false)

  // Form handling
  const { register, handleSubmit, reset } = useForm<WorkSpaceFormData>()

  // React Query for fetching workspaces
  const { data: workspacesData, isLoading } = useQuery<WorkSpaceResponse>({
    queryKey: ['workspaces'] as const,
    queryFn: getWorkSpaces,
  })

  // Update workspaces in Zustand store when data changes
  const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces)
  const workspaces = useWorkspaceStore((state) => state.workspaces)

  useEffect(() => {
    if (workspacesData?.data) {
      setWorkspaces(workspacesData.data)
    }
  }, [workspacesData, setWorkspaces])

  // React Query for team manager assignment
  const assignManagerMutation = useMutation({
    mutationFn: assignTeamManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      setIsAssignModalOpen(false)
    }
  })

  // Mutation for editing workspace
  const editWorkspaceMutation = useMutation({
    mutationFn: (data: WorkSpaceFormData) => {
      // Your edit API call here
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      setIsEditModalOpen(false)
    }
  })

  // Mutation for adding workspace
  const addWorkspaceMutation = useMutation({
    mutationFn: (data: WorkSpaceFormData) => {
      // Your add API call here
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      setIsAddModalOpen(false)
      reset()
    }
  })

  // Mutation for deleting workspace
  const deleteWorkspaceMutation = useMutation({
    mutationFn: (workspaceId: string) => {
      // Your delete API call here
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      setIsDeleteModalOpen(false)
    }
  })

  const columns = [
    {
      key: 'name' as keyof WorkSpace,
      header: 'Name',
      sortable: true,
    },
    {
      key: 'createdBy' as keyof WorkSpace,
      header: 'CreatedBy',
      sortable: true,
      render: (workspace: WorkSpace) => (
        <span className='px-2 py-4 rounded-lg bg-blue-500 text-white'>
          {workspace.createdBy}
        </span>
      )
    },
    {
      key: 'assignedTo' as keyof WorkSpace,
      header: 'AssignedTo',
      sortable: false,
      render: (workspace: WorkSpace) => (
        <span>
          {workspace.assignedTo ? (
            <span className='bg-orange-500 px-6 py-2 shadow-md rounded-md text-white font-extrabold hover:shadow-lg transition-all'>
              {workspace.assignedTo}</span>
          ) : (
            <Button onClick={() => handleTeamManagerClick(workspace)}>
              <UserPlus2 />
            </Button>
          )}
        </span>
      )
    }
  ]

  const handleTeamManagerClick = async (workspace: WorkSpace) => {
    if (!workspace.assignedTo) {
      try {
        const { data } = await getTeamManagers()
        setTeamManagers(data)
        setSelectedWorkspace(workspace)
        setIsAssignModalOpen(true)
      } catch (error) {
        console.error('Error fetching team managers:', error)
      }
    }
  }

  const handleEdit = (workspace: WorkSpace) => {
    setSelectedWorkspace(workspace)
    setIsEditModalOpen(true)
  }

  const handleDelete = (workspace: WorkSpace) => {
    setSelectedWorkspace(workspace)
    setIsDeleteModalOpen(true)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">WorkSpace</h1>
        <Button
          variant='transparent'
          width='sm'
          icon={<Layers />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New WorkSpace
        </Button>
      </div>

      <DataTable<WorkSpace>
        data={workspaces}
        columns={columns}
        searchable
        searchField="name"
        pagination={true}
        itemsPerPage={8}
        actions={(workspace) => (
          <div className="flex gap-2 justify-center">
            <Button
              icon={<Edit />}
              variant='transparent'
              width='sm'
              onClick={() => handleEdit(workspace)}
            />
            <Button
              icon={<Trash size={'20px'} />}
              variant='error'
              width='sm'
              onClick={() => handleDelete(workspace)}
              className="bg-red-500"
            />
          </div>
        )}
      />

      {/* Edit Modal */}
      {selectedWorkspace && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit WorkSpace"
        >
          <form
            onSubmit={handleSubmit((data) => editWorkspaceMutation.mutate(data))}
            className='flex flex-col gap-4 text-black'
          >
            <div className='space-y-1'>
              <label>Name</label>
              <Input
                id='name'
                {...register('name')}
                value={selectedWorkspace.name}
                width='full'
              />
            </div>

            <div className='space-y-1 flex flex-col'>
              <label>Description</label>
              <textarea
                {...register('description')}
                defaultValue={selectedWorkspace.description}
                rows={3}
                className='border border-gray-300 rounded-md px-2 py-1'
              />
            </div>

            <div className='flex gap-4'>
              <Button variant='secondary'>
                Save
              </Button>
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant='primary'
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add WorkSpace"
      >
        <form
          onSubmit={handleSubmit((data) => addWorkspaceMutation.mutate(data))}
          className='text-black space-y-2'
        >
          <div className='space-y-1'>
            <label>Name</label>
            <Input
              id='name'
              {...register('name')}
              width='full'
              required
            />
          </div>

          <div className='space-y-1 flex flex-col'>
            <label>Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className='border border-gray-300 rounded-md px-2 py-1'
              required
            />
          </div>

          <div className='flex gap-4'>
            <Button variant='secondary'>
              Save
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant='primary'
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete WorkSpace"
      >
        <div className='space-y-4'>
          <div className='text-center text-gray-600'>
            <p>Are you sure you want to delete this WorkSpace?</p>
          </div>
          <div className='flex gap-4 justify-center'>
            <Button
              variant='error'
              onClick={() => selectedWorkspace && deleteWorkspaceMutation.mutate(selectedWorkspace.id)}
            >
              Yes
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant='primary'
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      {/* Assign Manager Modal */}
      <AssignManagerModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        managers={teamManagers}
        onAssign={async (email) => {
          await assignManagerMutation.mutateAsync({ 
            email, 
            teamName: selectedWorkspace?.name || ''
          })
        }}
      />
    </div>
  )
}

export default WorkSpaceTable