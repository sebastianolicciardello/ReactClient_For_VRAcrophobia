import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const PlayerDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const playerId = location.state.playerId
  const [player, setPlayer] = useState({
    difficulty: 0,
    movement: true,
    turn: true
  });

  // recover token from local storage
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchPlayerDetail()
  }, [])

  async function fetchPlayerDetail() {
    try {
      const params = new URLSearchParams();
      params.append('id', playerId);
      

      const response = await axios.post('http://localhost:13756/fetchPlayerDetail', params.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });


      setPlayer(response.data);

    } catch (error) {
      console.error('Error creating player:', error);
    }

  }

  function handleDifficultyChange(event) {
    const value = event.target.value
    updateValue('difficulty', value)
  }

  function handleNoMovementChange(event) {
    const value = event.target.checked
    updateValue('movement', value)
  }

  function handleNoTurnChange(event) {
    const value = event.target.checked
    updateValue('turn', value)
  }

  async function updateValue(key, value) {
      try {
        const params = new URLSearchParams();
        params.append('key', key);
        params.append('value', value);
        params.append('id', playerId);
        const response = await axios.post('http://localhost:13756/updatePlayerSettings', params.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })

        setPlayer(prevPlayer => ({ ...prevPlayer, [key]: value }));
      } catch (error) {
        console.error('Error updating player value:', error);
      }
  }

  async function deletePlayer() {
    try {
      // Show a confirmation dialog
      const confirmed = confirm('Are you sure you want to delete this player?');
  
      if (!confirmed) {
        // Do not delete the player
        return;
      }
  
      const params = new URLSearchParams();
      params.append('id', playerId);
      const response = await axios.post('http://localhost:13756/deletePlayer', params.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      // redirect to homepage
      navigate('/homepage');
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  }


  return (
    <div className="p-4">
        <div>
            <button
                onClick={() => navigate('/homepage')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            >
                Back
            </button>
        </div>
        <div className="flex  flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">{player.fullName}</h1>
            <h1 className="text-2xl font-medium mb-4">
                Points: <span className="font-bold">{player.points}</span>
            </h1>
            <h1 className="mb-4">
                Floor Unlocked: <span className="font-bold">{player.floorUnlocked}</span>
            </h1>

            <h1 className="mb-4">
            Difficulty:
            <select
                value={player.difficulty}
                onChange={handleDifficultyChange}
                className="mx-4 py-1 px-1 border border-gray-300 rounded-lg align-middle"
            >
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Hard</option>
            </select>
        </h1>
        <h1 className="mb-4 align-middle">
            Movement:
            <input
                type="checkbox"
                checked={player.movement}
                onChange={handleNoMovementChange}
                className="ml-2 align-middle"
            />
        </h1>
        <h1 className="mb-4 align-middle">
            Turn:
            <input
                type="checkbox"
                checked={player.turn}
                onChange={handleNoTurnChange}
                className="ml-2 align-middle"
            />
        </h1>
        <button
                onClick={()=>{deletePlayer()}}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            >
                Delete
            </button>
        </div>

        
    </div>
);


}

export default PlayerDetail