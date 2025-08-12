import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import NoteForm from "../components/NoteForm";

// /editNote/:id

const EditNotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [noteData, setNoteData] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes/${id}`
        );
        setNoteData(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar la nota");
      }
    };
    fetchNote();
  }, [id]);

   const handleUpdate = async (updatedNote) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, updatedNote);
      if (res.status !== 200) {
        throw new Error("Error al actualizar la nota");
      }
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

  return (
    <div>
      <NoteForm 
      onSubmit={handleUpdate}
      initialDate={noteData}
      />
    </div>
  );
};

export default EditNotePage;
