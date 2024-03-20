import React from "react";

// Definición de tipos de propiedades del componente
interface VerTodoBotonProps {
  // Propiedad para establecer el estado de "completados"
  setShowCompleted: (value: boolean) => void;
  // Propiedad para establecer el estado de "todas las tareas"
  setShowAllTasks: (value: boolean) => void;
}

// Definición del componente funcional
const VerTodo: React.FC<VerTodoBotonProps> = ({
  setShowAllTasks,
  setShowCompleted,
}) => {
  return (
    <button
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
      onClick={() => {
        setShowCompleted(true);
        setShowAllTasks(true);
      }}
    >
      Mostrar Todas
    </button>
  );
};

export default VerTodo;
