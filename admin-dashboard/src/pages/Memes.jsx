import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import './Memes.css';

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
    <div className="memes-container">
      <h1 className="memes-title">Manage Memes</h1>
      <table className="memes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Caption</th>
            <th>Image</th>
            <th>Votes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memes.map((meme) => (
            <tr key={meme._id}>
              <td>{meme._id}</td>
              <td>{meme.caption}</td>
              <td>
                <img src={meme.imageUrl} alt={meme.caption} />
              </td>
              <td>{meme.votes.length}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(meme._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memes;