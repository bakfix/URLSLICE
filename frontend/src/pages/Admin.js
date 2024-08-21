import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/web/admin/users/')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Ошибка при загрузке пользователей');
                setLoading(false);
                console.error('Error fetching users:', error);
            });
    }, []);

    const deleteUser = (userId) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            axios.delete(`http://localhost:8000/web/admin/users/${userId}/`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== userId));
                    alert('Пользователь успешно удален');
                })
                .catch(error => {
                    setError('Ошибка при удалении пользователя');
                    console.error('Error deleting user:', error);
                });
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="relative max-w-xl mx-auto sm:text-center">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Вы вошли в административную панель
                </h3>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Список пользователей</h2>
                    <button
                        onClick={toggleMenu}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        {isMenuOpen ? '▲' : '▼'}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="mt-4 max-h-96 overflow-y-scroll border border-gray-300 p-4 rounded-md shadow-sm">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="py-2 px-4 border-b">{user.id}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
