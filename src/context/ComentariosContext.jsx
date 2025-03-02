import { createContext, useState, useEffect } from "react";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  // Función para obtener comentarios de una publicación específica
  const fetchComentarios = async (idPublicacion) => {
    try {
      const response = await fetch(
        `https://hito3-backend.onrender.com/api/publicacion/${idPublicacion}/comentarios`
      );
      if (!response.ok) throw new Error("Error al obtener comentarios");

      const data = await response.json();
      setComentarios(data); // Guarda los comentarios en el contexto
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  };

  // Función para agregar un nuevo comentario
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

  return (
    <CommentContext.Provider value={{ comentarios, fetchComentarios, addComentario }}>
      {children}
    </CommentContext.Provider>
  );
};
