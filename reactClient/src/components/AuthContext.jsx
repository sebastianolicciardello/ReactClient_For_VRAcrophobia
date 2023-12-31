import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState('');

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Verify the token on the server and extract the username
    const verifyToken = (token) => {
        return fetch('http://localhost:13756/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Token verification failed');
            }
            return response.json();
          })
          .then((data) => {
            return data.id;
          });
      };

    
    // Set the id in the state
    verifyToken(token)
      .then((id) => setId(id))
      .catch((error) => console.error(error));
  }, []);

  return (
    <AuthContext.Provider value={{ id }}>
      {children}
    </AuthContext.Provider>
  );
};