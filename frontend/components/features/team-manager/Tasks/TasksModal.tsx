'use client'

{/* ISSUE ->: We need ot stop the canel button from submiting the form we need to update our Button component to do this */}


import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { NotebookPen } from 'lucide-react'
import React, { Fragment, useState } from 'react'

function TasksModal() {
  const [addModal, setAddModal] = useState(false);

  return (
    <div>
      <div className='w-full flex justify-between text-gray-600'>
        <h2 className='text-3xl font-bold'>Tasks</h2>
        <Button 
          icon={<NotebookPen />} 
          width='sm' 
          variant='transparent' 
          onClick={() => setAddModal(true)}
        >
          Add Task
        </Button>

        <Transition.Root show={addModal} as={Fragment}>
          <Dialog 
            as="div" 
            className="relative z-50 text-gray-600" 
            onClose={() => setAddModal(false)}
          >
            {/* Backdrop Transition */}
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            </Transition.Child>

            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal Content Transition */}
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-out duration-300"
                  enterFrom="translate-y-full opacity-0 scale-95"
                  enterTo="translate-y-0 opacity-100 scale-100"
                  leave="transform transition ease-in duration-200"
                  leaveFrom="translate-y-0 opacity-100 scale-100"
                  leaveTo="translate-y-full opacity-0 scale-95"
                >
                  <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-md">
                    <DialogTitle className="font-bold text-xl">Add New Task</DialogTitle>
                    <form className='w-full space-y-4'>
                      <div>
                        <label title="name">Name</label>
                        <Input id="name" type='text' className='w-full' required />
                      </div>
                      <div>
                        <label title='Description'>Description</label>
                        <textarea 
                          id='Description' 
                          rows={5} 
                          className='w-full p-2 border border-gray-300 rounded-md' 
                          required 
                        />
                      </div>
                      <div>
                        <label title='DeadLine'>DeadLine</label>
                        <Input id='DeadLine' type='date' className='w-full' required />
                      </div>
                      <div>
                        <label title='assignedTo'>AssignedTo</label>
                        <select className='w-full p-2 rounded-sm' required>
                          <option>User1</option>
                        </select>
                      </div>
                      <div className='flex gap-4 mt-4'>
                        <Button 
                          variant='error' 
                          onClick={() => setAddModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button >
                          Add Task
                        </Button>
                      </div>
                    </form>
                  </DialogPanel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )
}

export default TasksModal