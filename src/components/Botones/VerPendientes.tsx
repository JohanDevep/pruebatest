import React from "react";

// Definición de tipos de propiedades del componente
interface VerPendientesBotonProps {
  // Propiedad para establecer el estado de "completados"
  setShowCompleted: (value: boolean) => void;
  // Propiedad para establecer el estado de "todas las tareas"
  setShowAllTasks: (value: boolean) => void;
}
//creamos un componente funcional con react.fc
const VerPendientes: React.FC<VerPendientesBotonProps> = ({
  setShowCompleted,
  setShowAllTasks,
}) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
      onClick={() => {
        setShowCompleted(false);
        setShowAllTasks(true);
      }}
    >
      Mostrar Pendientes
    </button>
  );
};

export default VerPendientes;
