import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Aquí puedes validar los datos de usuario (esto puede ir a un API)
    if (username === 'admin' && password === 'password123') {
      onLogin(true);  // Llamamos a onLogin para indicar que el usuario ha iniciado sesión
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Iniciar sesión</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
