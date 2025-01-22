import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'

function Dashboard() {
    const {logout} = useContext(AdminAuthContext)
  return (
    <>
    <Layout>
        <h1>dushantha</h1>
        <button onClick={logout}>LogOut</button>
    </Layout>
    </>
  )
}

export default Dashboard
