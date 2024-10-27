import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://auth-backend-d9yx.onrender.com/api/v1/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // This ensures that cookies are included in the request
            });

            if (response.ok) {
                // If you want to manually manage the cookie in React (optional):
                const data = await response.json();
                Cookies.set('accessToken', data.accessToken, { expires: 1/144, secure: true }); // 10 minutes in days
                Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true });

                navigate('/home');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    }

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
            <p className="mt-4">
                Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Create one</a>
            </p>
        </div>
    );
};

export default LoginPage;
