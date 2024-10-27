import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './utils//PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
