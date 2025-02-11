import React from 'react'
import { WorkSpace } from '@/types/Work-Space'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { createSlug } from '@/lib/utils/slugify'

interface CardProps {
  data: WorkSpace[]
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {data ? (
        data.map((val: WorkSpace) => (
          <Link href={`/team-manager/workspace/${createSlug(val.name,val.id)}`} key={val.id}>
            <div className="bg-transparent rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 group relative">
                
            <div className="aspect-square relative mb-4 transition-all overflow-hidden">
                <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition-all duration-300 bg-white/50 text-primary-600 scale-150 rounded-lgz-10 translate-x-full group-hover:translate-x-0 overflow-hidden">
                    <ChevronRight size={70}/>
                </div>
                <Image
                  src={"/next.svg"}
                  alt="WorkSpace Images"
                  fill
                  className="object-cover rounded-md opacity-100 group-hover:opacity-40 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-600 font-semibold text-lg mb-2">
                  {val.name}
                </span>
                <p className="text-gray-500">{val.description}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No workspaces available
        </div>
      )}
    </div>
  )
}

export default Card