import './App.css'
import { Link, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useReducer } from 'react';
import UserContext from './context/UserContext';
import Home from "./pages/Home";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import CategoryContainer from './pages/CategoryContainer';
import ExpenseContainer from './pages/ExpenseContainer';
import { fetchUserCategories, resetCategory } from './slices/category-slice';
import { useDispatch } from 'react-redux';
import { fetchUserExpenses, resetExpenses } from './slices/expense-slice';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('token')) { // only if logged in, then make api call 
        dispatch(fetchUserCategories());
        dispatch(fetchUserExpenses());
    }
  }, [dispatch])

  return (
    <div>
      <h1>Expensify</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {( isLoggedIn || localStorage.getItem('token')) && (
         <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            {(user?.role === "admin" || user?.role === "moderator") && <li><Link to="/users-list">List Users</Link></li>}
            <li><Link to="/" onClick={() => {
              handleLogout();
              dispatch(resetCategory());
              dispatch(resetExpenses())
            }}>Logout</Link></li>
         </>
        )}

        { (!isLoggedIn && !localStorage.getItem('token')) && (
        <>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </>
        )}
      </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute allowedRoles={['admin', 'user']}><Dashboard /></PrivateRoute>} /> 
          <Route path="/account" element={<PrivateRoute allowedRoles={['admin', 'moderator','user']}><Account /></PrivateRoute>} />
          <Route path="/users-list" element={<PrivateRoute allowedRoles={['admin', 'moderator']}><UsersList /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute allowedRoles={['user']}><CategoryContainer/></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute allowedRoles={['user']}><ExpenseContainer /></PrivateRoute>} />
        </Routes> 
    </div>
  )
}

export default App