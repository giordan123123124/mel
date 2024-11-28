import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Book, GraduationCap, Star, StarOff, X } from 'lucide-react';

const Logo = () => (
  <img
    src="/images/logo-uc.png"
    alt="Universidad Continental"
    className="h-24 object-contain"
  />
);

// Componente de pantalla de carga (splash screen)
const SplashScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-6">
      <Logo />
      <div className="text-xl text-blue-100">Sistema de Matrícula</div>
    </div>
  </div>
);

// Aquí se incluye el componente LoginScreen:
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
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

const SistemaMatricula = () => {
  const [pestañaActiva, setPestañaActiva] = useState('horarios');
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado de autenticación

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={setIsAuthenticated} />;  // Si no está autenticado, mostramos la pantalla de login
  }

  const cursos = [
    { id: 1, nombre: "Química 101", horario: "Sábado 9:00 AM", cupos: 30, modalidad: "trabajo" },
    { id: 2, nombre: "Física 101", horario: "Domingo 2:00 PM", cupos: 25, modalidad: "trabajo" },
    { id: 3, nombre: "Biología 101", horario: "Sábado 2:00 PM", cupos: 20, modalidad: "trabajo" }
  ];

  const horarios = [
    { dia: "Sábado", franjas: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { dia: "Domingo", franjas: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] }
  ];

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <Logo />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Sistema de Matrícula</h1>
                <p className="text-gray-600">Universidad Continental</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-4 mb-6">
                <TabButton
                  active={pestañaActiva === 'horarios'}
                  icon={Calendar}
                  label="Horarios"
                  onClick={() => setPestañaActiva('horarios')}
                />
                <TabButton
                  active={pestañaActiva === 'cursos'}
                  icon={Users}
                  label="Cursos Disponibles"
                  onClick={() => setPestañaActiva('cursos')}
                />
                <TabButton
                  active={pestañaActiva === 'periodos'}
                  icon={Clock}
                  label="Períodos"
                  onClick={() => setPestañaActiva('periodos')}
                />
              </div>

              {/* Content */}
              <div className="bg-gray-50 rounded-xl p-6">
                {pestañaActiva === 'horarios' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                      Horario de Fin de Semana
                    </h2>
                    {horarios.map((horario, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          {horario.dia}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {horario.franjas.map((franja, idx) => (
                            <div key={idx} className="bg-blue-50 rounded-xl p-4 text-blue-900 font-medium">
                              <Clock className="h-4 w-4 mb-2" />
                              {franja}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pestañaActiva === 'cursos' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                      Cursos Disponibles
                    </h2>
                    <div className="grid gap-4">
                      {cursos.map((curso) => (
                        <CourseCard key={curso.id} curso={curso} />
                      ))}
                    </div>
                  </div>
                )}

                {pestañaActiva === 'periodos' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                      Períodos de Matrícula
                    </h2>
                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                      <h3 className="font-bold text-blue-900 text-lg mb-2">Período Prioritario</h3>
                      <p className="text-blue-700">Primera Semana - Estudiantes que Trabajan</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Período Regular</h3>
                      <p className="text-gray-700">Segunda Semana de Matrícula</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-100">
                      <h3 className="font-bold text-green-900 text-lg mb-2">Estado Actual</h3>
                      <p className="text-green-700">Período de Matrícula Prioritaria Activo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SistemaMatricula;
