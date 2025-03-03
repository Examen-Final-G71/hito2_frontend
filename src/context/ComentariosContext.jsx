import { createContext, useState, useEffect } from "react";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  // Función para obtener comentarios de una publicación específica
  const fetchComentarios = async (publicacion_id) => {
    try {
      const response = await fetch(
        `https://hito3-backend.onrender.com/api/comentarios/publicacion/${publicacion_id}/comentarios`
      );
      if (!response.ok) throw new Error("Error al obtener comentarios");

      const data = await response.json();
      setComentarios(data); // Guarda los comentarios en el contexto
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  };

  // Agregar un nuevo comentario
 const addComentario = async (publicacion_id, comment, usuario_id, calificacion) => {
    try {
      const response = await fetch(
        "https://hito3-backend.onrender.com/api/comentarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicacion_id, comment, usuario_id, calificacion }),
        }
      );
      if (!response.ok) throw new Error("Error al agregar comentario");

      await fetchComentarios(publicacion_id); 
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
};
  //  Editar un comentario
  const editComentario = async (comentario_id, newComment) => {
    try {
      const response = await fetch(
        `https://hito3-backend.onrender.com/api/comentarios/${comentario_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (!response.ok) throw new Error("Error al editar comentario");

      setComentarios((prev) =>
        prev.map((comentario) =>
          comentario.id === comentario_id
            ? { ...comentario, comment: newComment }
            : comentario
        )
      );
    } catch (error) {
      console.error("Error al editar comentario:", error);
    }
  };

  //  Eliminar un comentario
  const deleteComentario = async (comentario_id) => {
    try {
      const response = await fetch(
        `https://hito3-backend.onrender.com/api/comentarios/${comentario_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar comentario");

      setComentarios((prev) => prev.filter((comentario) => comentario.id !== comentario_id));
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };



  return (
    <CommentContext.Provider value={{ 
      comentarios,
      fetchComentarios,
      addComentario,
      editComentario,
      deleteComentario
      }}>
      {children}
    </CommentContext.Provider>
  );
};
