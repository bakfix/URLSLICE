import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateShortUrl = () => {
    navigate("/shorturl");
  };
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Добро пожаловать на DELTA Short Link
          </h3>
          <div className="mt-3 max-w-xl">
            <p>
              Наш сайт предоставляет удобный способ создания и управления короткими ссылками. Зарегистрируйтесь или войдите в свой профиль, чтобы начать пользоваться сервисом.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-4">
          <button
            className="px-5 py-3 rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500"
            onClick={() => navigate('/register')}
          >
            Регистрация
          </button>
          <button
            className="px-5 py-3 rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500"
            onClick={() => navigate('/login')}
          >
            Вход
          </button>
            <button
              className="px-5 py-3 rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500"
              onClick={handleCreateShortUrl}>
              Создать короткую ссылку
            </button>
        </div>
      </div>
    </section>
  );
};

export default Home;