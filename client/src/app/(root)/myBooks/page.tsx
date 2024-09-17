import GetUserBooks from '@/components/features/GetUserBooks'
import AddBook from "@/components/features/AddBook";
import React from 'react'

const page = () => {
  return (
    <div>
      <AddBook/> 
      <GetUserBooks/>
    </div>
  )
}

export default page
