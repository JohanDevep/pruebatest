import React from "react";

// Definición de tipos de propiedades del componente
interface VerCompletoBotonProps {
  // Propiedad para establecer el estado de "completados"
  setShowCompleted: (value: boolean) => void;
  // Propiedad para establecer el estado de "todas las tareas"
  setShowAllTasks: (value: boolean) => void;
}

const VerCompleto: React.FC<VerCompletoBotonProps> = ({
  setShowCompleted,
  setShowAllTasks,
}) => {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
      onClick={() => {
        setShowCompleted(true);
        setShowAllTasks(false);
      }}
    >
      Mostrar Completas
    </button>
  );
};

export default VerCompleto;
