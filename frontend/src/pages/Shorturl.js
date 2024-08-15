import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shorturl = () => {
  const navigate = useNavigate();


 return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Введите полную ссылку
          </h3>
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium">

              </label>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Введите ссылку, которую хотите сократить"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />

          </div>
          <div className="flex items-center gap-2 mb-2">

          </div>

          <button
            type="submit"
            class="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
          >
            Создать короткую ссылку
          </button>
        </div>

      </div>

    </section>
  );
};

export default Shorturl;