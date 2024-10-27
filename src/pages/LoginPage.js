import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/authService';
import { useAuth } from '../utils/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await loginUser({ email, password });
            setIsAuthenticated(true);
            navigate('/'); // Redirect to the home page
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
