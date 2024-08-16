import React, { useState } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL + "/web/short";
const baseURL = "http://localhost:8000/web/";


const Shorturl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(URL, { long_url: longUrl });
    if (response.status === 201) {
      setShortUrl(response.data.short_url);
      setError('');
    } else {
      setError('Ошибка создания короткой ссылки');
    }
  } catch (err) {
    setError('Ошибка сервера: ' + (err.response?.data?.error || 'Неизвестная ошибка'));
  }
};


  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Введите полную ссылку
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-2 block">
              <label htmlFor="long_url" className="text-sm font-medium">
              </label>
            </div>
            <input
              id="long_url"
              type="url"
              placeholder="Введите ссылку, которую хотите сократить"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
            <div className="flex items-center gap-2 mb-2">
              {error && <p className="text-red-500">{error}</p>}
              {shortUrl && (
             <p>
                Новая ссылка: <a href={`${baseURL}${shortUrl}`} target="_blank" rel="noopener noreferrer">{`${shortUrl}`}</a>
              </p>
              )}
            </div>
            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Создать короткую ссылку
            </button>
          </form>

        </div>
      </div>

    </section>
  );
};

export default Shorturl;
