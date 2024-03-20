import { useState, useEffect } from "react";
import { Tarea } from "../../types/tarea.type";
import VerTodo from "../Botones/VerTodo";
import VerCompleto from "../Botones/VerCompletos";
import VerPendientes from "../Botones/VerPendientes";

// Hook para el almacenamiento local
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Declara la función useLocalStorage, que toma una clave (key) y un valor inicial (initialValue) como argumentos
  const [value, setValue] = useState<T>(() => {
    // Utiliza el hook de estado (useState) para inicializar el estado "value"
    // Se proporciona un tipo genérico "T" para el estado "value"
    // La función pasada a useState se ejecuta solo una vez al inicio y define el valor inicial del estado "value"
    const storedValue = localStorage.getItem(key);
    // Obtiene el valor almacenado en el almacenamiento local (localStorage) con la clave proporcionada
    // Si no se encuentra un valor para esa clave, storedValue será nulo
    return storedValue ? JSON.parse(storedValue) : initialValue;
    // Comprueba si se encontró un valor almacenado para la clave
    // Si se encuentra, lo convierte de JSON a un objeto JavaScript (si es necesario)
    // Si no se encuentra, utiliza el valor inicial (initialValue)
  });

  useEffect(() => {
    // Utiliza el hook de efecto (useEffect) para realizar acciones cuando cambia la dependencia
    localStorage.setItem(key, JSON.stringify(value));
    // Almacenamiento en el localStorage: guarda el valor actual del estado "value" en el localStorage
    // La clave es la proporcionada como argumento "key", y el valor se convierte a una cadena JSON
  }, [key, value]);
  // La función de efecto se ejecuta cada vez que cambian "key" o "value"

  return [value, setValue] as const;
  // Devuelve una tupla con dos elementos: el valor actual del estado "value" y la función "setValue" para actualizar el estado
};

function TaskList() {
  // Utiliza el hook para manejar el almacenamiento local
  const [tasks, setTasks] = useLocalStorage<Tarea[]>("tasks", []);
  const [newTask, setNewTask] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showAllTasks, setShowAllTasks] = useState<boolean>(true);

  // Función para agregar una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObject: Tarea = {
      id: tasks.length + 1,
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  // Función para cambiar el estado de completitud de una tarea
  const toggleCompleted = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Filtra las tareas pendientes y completadas
  const totalTasks = tasks.length;
  const remainingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Lista de Tareas</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nueva Tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none mb-4 w-full"
      >
        Añadir
      </button>
      <div>
      <p className="text-lg font-semibold">
          Tareas: {totalTasks}
        </p>
        <p className="text-lg font-semibold">
          Tareas Pendientes: {remainingTasks.length}
        </p>
        <p className="text-lg font-semibold">
          Tareas Completadas: {completedTasks.length}
        </p>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <VerPendientes
          setShowCompleted={setShowCompleted}
          setShowAllTasks={setShowAllTasks}
        />
        <VerCompleto
          setShowCompleted={setShowCompleted}
          setShowAllTasks={setShowAllTasks}
        />
        <VerTodo
          setShowAllTasks={setShowAllTasks}
          setShowCompleted={setShowCompleted}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((task) => {
          const shouldShow =
            (showCompleted && task.completed) ||
            (!task.completed && showAllTasks);

          return shouldShow ? (
            <li key={task.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className="text-blue-500"
              />
              <span
                className={`text-lg ${task.completed ? "line-through" : ""}`}
              >
                {task.description}
              </span>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default TaskList;
