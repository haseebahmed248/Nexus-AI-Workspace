'use client'
import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Column<T> {
  key: keyof T
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T, e: React.MouseEvent<HTMLTableRowElement>) => void 
  searchable?: boolean
  searchField?: keyof T
  actions?: (item: T) => React.ReactNode
  pagination?: boolean
  itemsPerPage?: number
}

export function DataTable<T extends { id: string | number }>({ 
  data,
  columns,
  searchable,
  searchField,
  actions,
  pagination = true,
  itemsPerPage = 10,
  onRowClick
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ key: keyof T, direction: 'asc' | 'desc' }>()
  
  // Filter logic
  const filteredData = data.filter(item => {
    if (!searchable || !search || !searchField) return true
    return String(item[searchField]).toLowerCase().includes(search.toLowerCase())
  })

  // Sort logic
  const sortedData = sort
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sort.key]
        const bValue = b[sort.key]
        const direction = sort.direction === 'asc' ? 1 : -1
        return aValue < bValue ? -direction : direction
      })
    : filteredData

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = pagination
    ? sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : sortedData

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4">
          <Input
            placeholder="Search..."
            value={search}
            id='search'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <div className="w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th 
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => {
                    if (column.sortable) {
                      setSort(current => ({
                        key: column.key,
                        direction: current?.direction === 'asc' ? 'desc' : 'asc'
                      }))
                    }
                  }}
                  style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sort?.key === column.key && (
                      <span>{sort.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map(item => (
              <tr 
                key={item.id}
                onClick={(e) => onRowClick?.(item, e)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              >
                {columns.map(column => (
                  <td 
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render 
                      ? column.render(item)
                      : String(item[column.key])
                    }
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}