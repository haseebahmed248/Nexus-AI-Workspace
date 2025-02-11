import Button from '@/components/ui/Button'
import { Modal } from '@/components/ui/modal/Modal'
import { TeamManager } from '@/types/Team-Manager'
import { useForm } from 'react-hook-form'

interface AssignManagerModalProps {
  isOpen: boolean
  onClose: () => void
  managers: TeamManager[]
  onAssign: (email: string) => Promise<void>
}

export function AssignManagerModal({ isOpen, onClose, managers, onAssign }: AssignManagerModalProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: managers[0]?.email || '' 
    }
  })

  const onSubmit = async (data: { email: string }) => {
    console.log('assigning to: ', data)
    await onAssign(data.email)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Team Manager">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <label htmlFor="email">Select:</label>
          <select 
            {...register('email')} 
            className="flex-1 px-7 py-2 bg-neutral-300 rounded-md"
          >
            {managers.map((manager) => (
              <option key={manager.id} value={manager.email}>
                {manager.name} 
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">Choose</Button>
          <Button onClick={onClose} variant="primary">Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}