import React, { useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import axios from "axios";
import formatData from "../utils/formatData";

const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener notas al cargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes`);
        setNotes(response.data);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Eliminar nota del estado después de borrarla en CardNote
  const handleDeleteFromState = (deletedId) => {
    setNotes((prev) => prev.filter((n) => n._id !== deletedId));
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]">
      {notes.length > 0 ? (
        notes.map((note) => (
          <CardNote
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            date={formatData(note.createdAt)}
            onDelete={handleDeleteFromState}
          />
        ))
      ) : (
        <p className="text-center col-span-full">No hay notas disponibles</p>
      )}
    </div>
  );
};

export default HomePage;

