import React from 'react'
import { Link } from 'react-router-dom'



function CustomerSidebar() {
  return (
     <>
      <Link to="/CustomerShowOrders" className="block px-4 py-2 text-purple-700 hover:bg-purple-100">
       Show Orders
      </Link>
     </>
  )
}

export default CustomerSidebar