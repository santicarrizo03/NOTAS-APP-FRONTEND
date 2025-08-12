import React, { useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import axios from "axios";
import formatData from "../utils/formatData";
import { toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las notas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta nota?")) return;
    try {
      await axios.delete(`${apiURL}/api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Nota eliminada con éxito", { position: "bottom-center" });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la nota");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]">
      {notes.map((note) => (
        <CardNote
          key={note._id}
          id={note._id}
          title={note.title}
          description={note.description}
          date={formatData(note.createdAt)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default HomePage;


