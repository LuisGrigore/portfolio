import type { Handler } from "@netlify/functions";
import {
  getAllProjects,
  createProject,
  getProjectsWithTags,
} from "../../../services/project.service.js";

// export const handler: Handler = async (event) => {
//   const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   };

//   try {
//     if (event.httpMethod === "OPTIONS") {
//       return { statusCode: 200, headers: corsHeaders, body: "OK" };
//     }

//     if (event.httpMethod === "GET") {
//       const projects = await getAllProjects();
//       return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(projects) };
//     }

//     if (event.httpMethod === "POST") {
//       const data = JSON.parse(event.body || "{}");
//       const newProject = await createProject(data);
//       return { statusCode: 201, headers: corsHeaders, body: JSON.stringify(newProject) };
//     }

//     return { statusCode: 405, headers: corsHeaders, body: "Método no permitido" };
//   } catch (error: any) {
//     console.error("❌ Error en getProjects:", error);
//     return {
//       statusCode: 500,
//       headers: corsHeaders,
//       body: JSON.stringify({ error: error.message || "Error interno del servidor" }),
//     };
//   }
// };

export const handler: Handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers: corsHeaders, body: "OK" };
    }

    if (event.httpMethod === "GET") {
      // 👇 Leer query params
      const encodedTags = event.queryStringParameters?.tags;

      if (encodedTags) {
        // 👇 Decodificar y convertir a array
        const decoded = decodeURIComponent(encodedTags);
        const tagsArray = decoded.split(",");

        const projects = await getProjectsWithTags(tagsArray);

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(projects),
        };
      }

      // 👇 fallback: todos los proyectos
      const projects = await getAllProjects();
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(projects),
      };
    }

    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body || "{}");
      const newProject = await createProject(data);
      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify(newProject),
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Método no permitido",
    };
  } catch (error: any) {
    console.error("❌ Error en getProjects:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message || "Error interno del servidor",
      }),
    };
  }
};