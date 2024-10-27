import React, { useEffect, useState } from 'react';
import { getCurrentUser, getUserSessions, deleteSession, deleteAllSessions } from '../utils/authService';
import { useAuth } from '../utils/AuthContext';

const HomePage = () => {
    const { user, setUser, setIsAuthenticated } = useAuth();
    const [sessions, setSessions] = useState([]);

    // Fetch user profile and sessions on load
    useEffect(() => {
        const fetchProfileAndSessions = async () => {
            try {
                const userProfile = await getCurrentUser();
                setUser(userProfile.data.data);
                console.log(userProfile.data.data);

                const sessionsResponse = await getUserSessions();
                setSessions(sessionsResponse.data.data);
                console.log(sessionsResponse.data.data);
            } catch (error) {
                console.error('Error fetching profile and sessions:', error);
            }
        };

        fetchProfileAndSessions();
    }, [setUser]);

    // Handle logging out of a specific session
    const handleDeleteSession = async (sessionId) => {
        try {
            await deleteSession(sessionId); // Call deleteSession service function
            setSessions(sessions.filter(session => session._id !== sessionId));
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    // Handle logging out of all sessions
    const handleLogoutAll = async () => {
        try {
            await deleteAllSessions(); // Call deleteAllSessions service function
            setIsAuthenticated(false);
            // Optionally, redirect the user to the login page
        } catch (error) {
            console.error('Error logging out of all sessions:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">Your Profile</h2>
                <div className="bg-white p-4 rounded shadow-md mt-2">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Phone Number:</strong> {user?.phonenumber}</p>
                    <p><strong>Created On:</strong> {new Date(user?.createdOn).toLocaleString()}</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold">Active Sessions</h2>
                <div className="bg-white p-4 rounded shadow-md mt-2">
                    {sessions.length === 0 ? (
                        <p>No active sessions found.</p>
                    ) : (
                        <ul>
                            {sessions.map((session) => (
                                <li key={session._id} className="border-b py-2 flex justify-between items-center">
                                    <div>
                                        <p><strong>IP Address:</strong> {session.ipAddress}</p>
                                        <p><strong>Device Type:</strong> {session.deviceType}</p>
                                        <p><strong>Created At:</strong> {new Date(session.createdAt).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSession(session._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Log out from this device
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={handleLogoutAll}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Log out from all devices
                </button>
            </section>
        </div>
    );
};

export default HomePage;
