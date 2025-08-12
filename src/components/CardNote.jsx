import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CardNote = ({ id, title, description, date, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta nota?")) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
      if (res.status !== 200 && res.status !== 204) {
        throw new Error("Error al eliminar la nota");
      }
      toast.success("¡Nota eliminada con éxito!", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      if (onDelete) onDelete(id); // para que el padre actualice el estado
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la nota");
    }
  };

  return (
    <div className="card bg-base-300 w-full">
      <div className="card-body">
        <h2 className="card-title text-accent font-bold lg:text-2xl">
          {title}
        </h2>
        <p className="text-amber-50">{description}</p>
        <div className="flex justify-between items-center mt-6">
          <time dateTime={date}>{date}</time>
          <div className="flex gap-4">
            <SquarePen
              className="text-white cursor-pointer"
              onClick={() => navigate(`/edit/${id}`)}
            />
            <Trash
              className="text-red-400 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNote;

