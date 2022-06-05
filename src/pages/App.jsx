import React from 'react'
import { Outlet } from 'react-router-dom'
import Router from '../routes/Router'
import { useNavigate } from 'react-router-dom'

const App = () => {
    // const navigate = useNavigate()

    // navigate('/login')
    return (
        <Router>
            <Outlet />
        </Router>
    )
}

export default App