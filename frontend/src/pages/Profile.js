import { useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserIcon from "../images/user.png";

const baseURL = "http://localhost:8000/web/";
const Profile = (props) => {
  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;
  let navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!isLoggedIn) redirect("/");

    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/web/user/urls/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUrls(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error(err);
      }
    };

    fetchUrls();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    localStorage.removeItem('token');
    navigate("/login");
    toast.success("Вы вышли из аккаунта");
  };

  const handleCreateShortUrl = () => {
    navigate("/shorturl");
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img alt="User Icon" width="96" height="96" src={UserIcon} className="mb-3 rounded-full shadow-lg" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <button
              className="inline-flex items-center rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              onClick={handleCreateShortUrl}>
              Создать короткую ссылку
            </button>
            <button
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          <h3 className="text-lg font-semibold">Мои короткие ссылки:</h3>
          <ul className="list-disc list-inside mt-2">
            {urls.length > 0 ? (
              urls.map((url) => (
                <li key={url.id}>
                  Короткая ссылка: <a href={`${baseURL}${url.short_url}`} target="_blank" rel="noopener noreferrer">{`${url.short_url}`}</a>
                </li>
              ))
            ) : (
              <p>У вас нет коротких ссылок.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
