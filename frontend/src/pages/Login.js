import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL + "/web/login";

const Login = (props) => {
    let navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props;

    useEffect(() => {
        if (isLoggedIn) navigate("/profile");
    }, [isLoggedIn, navigate]);

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const formData = { email: email, password: password };
        try {
            const res = await axios.post(URL, formData);
            const data = res.data;
            if (data.success) {
                toast.success(data.message);
                setIsLoggedIn(true);
                setEmail(email);

                if (data.is_admin) {
                    navigate("/admin");
                } else {
                    navigate("/profile");
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login.");
        }
    };

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Вход в аккаунт
        </h5>
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleLogin}
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium required">
                Почта
              </label>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Введите почту, которую указали при регистрации"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2 block">
              <label
                htmlFor="password"
                className="text-sm font-medium required"
              >
                Пароль
              </label>
              <div className="text-sm">

              </div>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember" className="text-sm font-medium">
              Запомнить
            </label>
          </div>

          <button
            type="submit"
            class="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
          >
            Войти
          </button>

          <p className="text-center text-sm text-gray-500">
            Не зарегистрированы?{" "}
            <a
              href="register"
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Зарегистрируйтесь
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
