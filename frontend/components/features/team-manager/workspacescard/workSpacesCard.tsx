'use client'
import Card from '@/components/ui/Card/Card'
import { getSpecificWorkSpaces } from '@/lib/api/work-space'
import React, { useEffect, useState } from 'react'
import { WorkSpace } from '@/types/Work-Space'

function WorkSpacesCard() {
  const [workspace, setWorkspace] = useState<WorkSpace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkSpaces = async () => {
      try {
        const data = await getSpecificWorkSpaces()
        setWorkspace(data.data)
      } catch (error) {
        console.error('Error fetching workspaces:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkSpaces()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-700"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-primary-700 text-center mb-8">
        Select WorkSpace
      </h3>
      <Card data={workspace} />
    </div>
  )
}

export default WorkSpacesCard