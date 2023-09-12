import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const Homepage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    fullName: ''
  });

  // recover token from local storage
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

 useEffect(() => {
    fetchPlayers();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  async function fetchPlayers() {
    try {
      const response = await axios.get('http://localhost:13756/fetchPlayers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
 
      setPlayers(response.data);

    } catch (error) {
      console.error('Error fetching players:', error);
      // Handle the error
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'fullName' && value.length > 20) {
      // Limit the fullName to 20 characters
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        [name]: value.slice(0, 20)
      }));
    } else {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        [name]: value
      }));
    }
  }

  async function createPlayer() {
    try {
      const params = new URLSearchParams();
      params.append('fullName', player.fullName);

      const response = await axios.post('http://localhost:13756/createPlayer',params.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

    } catch (error) {
      console.error('Error creating player:', error);
    }
    fetchPlayers();
  }

  return (
    <div className="container mx-auto px-4">
      <Header fullName={token?.user?.user_metadata?.full_name} handleLogout={handleLogout} />

      <div className="flex justify-center flex-col items-center">
        <form onSubmit={createPlayer} className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={handleChange}
            className="mb-4 mx-4 py-2 px-3 border border-gray-300 rounded-full"
          />

          <button
            type="submit"
            className=" mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create
          </button>
        </form>

        <table className="table-auto rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player._id} className="bg-white">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border cursor-pointer">
                  <Link
                    to={`/players/${player._id}`}
                    state={{ playerId: player._id }}
                    className="hover:underline text-blue-500"
                  >
                    {player.fullName}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    </div>
  );
}

export default Homepage;
