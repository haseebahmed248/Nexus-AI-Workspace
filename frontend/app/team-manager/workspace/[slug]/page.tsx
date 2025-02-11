import React from 'react'

function page({ params }: { params: { slug: string } }) {

    const id = params.slug.split('-').pop();

    console.log("ID is : ", id);
  return (
    <div>
      Hi there
    </div>
  )
}

export default page
