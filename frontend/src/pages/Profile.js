import { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { Avatar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";

const Profile = (props) => {
  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;
  let navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    navigate("/login");
    toast.success("Вы вышли из аккаунта");
  };

  const handleCreateShortUrl = () => {
    navigate("/shorturl");
  };

  useEffect(() => {
    if (!isLoggedIn) redirect("/");
  }, [isLoggedIn]);

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
      </div>
    </div>
  );
};

export default Profile;
