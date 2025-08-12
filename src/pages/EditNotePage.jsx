import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NoteForm from "../components/NoteForm";

const EditNotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  // Obtener datos de la nota a editar
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
        setNoteData({
          title: res.data.title,
          description: res.data.description,
        });
      } catch (error) {
        console.error("Error al cargar la nota:", error);
        toast.error("No se pudo cargar la nota");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Manejar la actualización
  const handleUpdate = async (updatedNote) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, updatedNote);
      if (res.status !== 200) throw new Error("Error al actualizar la nota");

      toast.success("¡Nota actualizada con éxito!", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar la nota");
    }
  };

  if (loading) return <p className="text-center">Cargando nota...</p>;

  return (
    <div>
      <NoteForm onSubmit={handleUpdate} initialDate={noteData} />
    </div>
  );
};

export default EditNotePage;

