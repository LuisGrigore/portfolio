import { createSkill, getAllSkills } from "../../../services/skill.service.js";
import { Handler } from "@netlify/functions";

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
      const projects = await getAllSkills();
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(projects) };
    }

    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body || "{}");
      const newProject = await createSkill(data);
      return { statusCode: 201, headers: corsHeaders, body: JSON.stringify(newProject) };
    }

    return { statusCode: 405, headers: corsHeaders, body: "Método no permitido" };
  } catch (error: any) {
    console.error("❌ Error en getProjects:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message || "Error interno del servidor" }),
    };
  }
};
