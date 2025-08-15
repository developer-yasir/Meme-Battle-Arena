import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Memes = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const { data } = await API.get('/memes');
        setMemes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/memes/${id}`);
      setMemes(memes.filter((meme) => meme._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Memes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700 text-left">ID</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Caption</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Image</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Votes</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {memes.map((meme) => (
              <tr key={meme._id}>
                <td className="py-2 px-4 border-b border-gray-700">{meme._id}</td>
                <td className="py-2 px-4 border-b border-gray-700">{meme.caption}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <img src={meme.imageUrl} alt={meme.caption} className="w-16 h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b border-gray-700">{meme.votes.length}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button onClick={() => handleDelete(meme._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Memes;