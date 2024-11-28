import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Book, GraduationCap, Star, StarOff, X } from 'lucide-react';

const Logo = () => (
  <img
    src="/images/logo-uc.png"
    alt="Universidad Continental"
    className="h-24 object-contain"
  />
);

const SplashScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-6">
      <Logo />
      <div className="text-xl text-blue-100">Sistema de Matrícula</div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-blue-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const TeacherRating = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, index) => (
      index < rating ? (
        <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ) : (
        <StarOff key={index} className="w-4 h-4 text-gray-300" />
      )
    ))}
  </div>
);

const CourseCard = ({ curso }) => {
  const [showTeachers, setShowTeachers] = useState(false);

  const teachers = [
    { id: 1, name: "Dr. Carlos Rodriguez", rating: 5, specialty: "Física Cuántica" },
    { id: 2, name: "Dra. Ana Martinez", rating: 4, specialty: "Física Teórica" },
    { id: 3, name: "Prof. Juan Pérez", rating: 3, specialty: "Física Experimental" }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-blue-900">{curso.nombre}</h3>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{curso.horario}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">{curso.cupos} cupos disponibles</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Book className="h-4 w-4 mr-2" />
              <span className="text-sm capitalize">Modalidad: {curso.modalidad}</span>
            </div>
          </div>
          <button
            onClick={() => setShowTeachers(true)}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Matricular
          </button>
        </div>
      </div>

      <Modal
        isOpen={showTeachers}
        onClose={() => setShowTeachers(false)}
        title={`Seleccionar Docente para ${curso.nombre}`}
      >
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-bold text-blue-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.specialty}</p>
                  <TeacherRating rating={teacher.rating} />
                </div>
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  onClick={() => {
                    alert(`Docente ${teacher.name} seleccionado`);
                    setShowTeachers(false);
                  }}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center px-6 py-3 rounded-xl transition-all duration-300
      ${active 
        ? 'bg-blue-900 text-white shadow-lg transform scale-105' 
        : 'bg-white hover:bg-blue-50 border border-gray-200'
      }
    `}
  >
    <Icon className={`h-5 w-5 mr-2 ${active ? 'text-blue-100' : 'text-blue-900'}`} />
    <span className="font-medium">{label}</span>
  </button>
);

const SistemaMatricula = () => {
  const [pestañaActiva, setPestañaActiva] = useState('horarios');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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