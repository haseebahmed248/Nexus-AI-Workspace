'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Modal } from '@/components/ui/modal/Modal'
import { DataTable } from '@/components/ui/table/DataTable'
import { getUsers } from '@/lib/api/user'
import { Edit, Trash, User } from 'lucide-react'
import React, { useEffect } from 'react'


export interface Column<T> {
    key: keyof T
    header: string
    render?: (item: T) => React.ReactNode
    sortable?: boolean
  }

interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'USER'
}


function AdminTable() {
  const [users, setUsers] = React.useState<User[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [addUser, setAddUser] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState(false);

  // Define columns inside the component
  const columns: Column<User>[] = [
    {
      key: 'name' as keyof User,
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email' as keyof User,
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role' as keyof User,
      header: 'Role',
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-full ${
          user.role === 'ADMIN' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      )
    },
  ]

  const handleRowClick = (user: User) => {
    console.log('Row clicked:', user)
  }

  const handleEdit = (user: User) => {
    console.log('Edit user:', user)
    setSelectedUser(user);
    setIsEditModalOpen(true)
  }

  const handleDelete = (user: User) => {
    console.log('Delete user:', user)
    setDeleteUser(true);
  }

  

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        // setLoading(true)
        const response = await getUsers()
        console.log('data: ',response)
        setUsers(response.data)
        // setError(null)
      } catch (err) {
        // setError('Failed to fetch users')
        console.error('Error fetching users:', err)
      } finally {
        // setLoading(false)
      }
    }
    fetchUsers();
  },[])

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button
          variant='transparent'
          width='sm'
          icon = {<User />}
          onClick={() => setAddUser(true)}

        >Add New User</Button>
      </div>

      <DataTable<User>
        data={users}
        columns={columns}
        searchable
        searchField="email"
        pagination = {true}
        itemsPerPage={8}
        onRowClick={handleRowClick}
        actions={(user) => (
          <div className="flex gap-2 justify-center">
            <Button 
              icon={<Edit />}
              variant='transparent'
              width='sm'
              onClick={() => handleEdit(user)}
            />
            <Button 
              icon={<Trash size={'20px'} />}
              variant='error'
              width='sm'
              onClick={() => handleDelete(user)}
              className="bg-red-500"
            />
          </div>
        )}
      />

      {/*  Edit user Modal */}

      {
        selectedUser && (
          <Modal
            isOpen={isEditModalOpen}            
            onClose={() => setIsEditModalOpen(false)}
            title="Edit User"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                console.log('Form submitted')
                setIsEditModalOpen(false)
              }}
              className='flex flex-col gap-4 text-black'
            >
              <div className='space-y-1'>
                <label title='name'>Name</label>
                <Input
                  id='name'
                  type='text'
                  width='full'
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>

              <div className='space-y-1'>
                <label title='email'>Email</label>
                <Input
                  id='email'
                  type='email'
                  width='full'
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              
              <div className='space-y-1 flex flex-col'>
                <label title='role'>Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value as 'ADMIN' | 'USER'})}
                  className='px-4 py-3 border rounded-md bg-white'
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='secondary'
                >
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
        )
      }

      {/*  Add user Modal */}
      {
        addUser && (
          <Modal
            isOpen={addUser}            
            onClose={() => setAddUser(false)}
            title="Add User"
          >
            <form className='text-black'
            onSubmit={(e) => {
              e.preventDefault();
              setAddUser(false);
            }}
            >
              <div className='space-y-1'>
                <label title='name'>Name</label>
                <Input
                  id='name'
                  type='text'
                  width='full'
                  required
                />
              </div>

              <div className='space-y-1'>
                <label title='email'>Email</label>
                <Input
                  id='email'
                  type='email'
                  width='full'
                  required
                />
              </div>
              
              <div className='space-y-1 flex flex-col'>
                <label title='role'>Role</label>
                <select
                  className='px-4 py-3 border rounded-md bg-white'
                  required
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='secondary'
                >
                  Save
                </Button>
                <Button
                  onClick={() => setAddUser(false)}
                  variant='primary'
                  >
                  Cancel
                </Button>
              </div>

            </form>
          </Modal>
        )
      }

      {/*  Delete User modal */}
      {
        deleteUser && (
          <Modal
            isOpen={deleteUser}            
            onClose={() => setDeleteUser(false)}
            title="Delete User"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDeleteUser(false);
              }}
              className='space-y-4'
            >
              <div className='text-center text-gray-600'>
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className='flex gap-4 justify-center'>
                <Button
                  variant='error'
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setDeleteUser(false)}
                  variant='primary'
                  >
                  No
                </Button>
              </div>
            </form>
          </Modal>
        )
      }
    </div>
  )
}

export default AdminTable