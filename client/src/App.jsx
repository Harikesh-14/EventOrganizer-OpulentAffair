import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './Components/HomePage/HomePage'
import LoginPage from './Components/LoginPage/LoginPage'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import { UserContextProvider } from './UserContent'
import UserProfile from './Components/UserProfile/UserProfile'
import OrganizeEvent from './Components/OrganizeEvent/OrganizeEvent'
import TicketPage from './Components/TicketPage/TicketPage'

function App() {

    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register-user' element={<RegisterUser />} />
                    <Route path='/user-profile' element={<UserProfile />} />
                    <Route path='/organize-event' element={<OrganizeEvent />} />
                    <Route path='/ticket/:id' element={<TicketPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
