import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../pages/log-in/logn-in';
import Regsiter from '../pages/register/register';
import Home from '../pages/home/home';
import Customer from '../pages/customer/customer';
import Bill from '../pages/bill/bill';
import Transfer from '../pages/transfer/transfer';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/log-in' element={<LogIn />} />
                <Route path='/register' element={<Regsiter />} />
                <Route path='/home' element={<Home />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/bill' element={<Bill />} />
                <Route path='/transfer' element={<Transfer />} />
                <Route path='/' element={<Navigate to='/log-in' />} />
                <Route path="*" element={<Navigate to="/log-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter