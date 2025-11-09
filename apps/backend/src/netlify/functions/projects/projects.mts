import type { Handler } from "@netlify/functions";
import { getAllProjects, createProject } from "../../../services/project.service.js";

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      const projects = await getAllProjects();
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(projects),
      };
    }

    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body || "{}");
      const newProject = await createProject(data);
      return {
        statusCode: 201,
        body: JSON.stringify(newProject),
      };
    }

    return { statusCode: 405, body: "Método no permitido" };
  } catch (error: any) {
    console.error("❌ Error en getProjects:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Error interno del servidor",
      }),
    };
  }
};
