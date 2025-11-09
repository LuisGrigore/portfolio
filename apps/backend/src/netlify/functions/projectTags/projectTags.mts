import { Handler } from "@netlify/functions";
import { getAllProjectTags } from "../../../services/projectTags.service.js";

export const handler: Handler = async (event) => {
  try {
	if (event.httpMethod === "GET") {
	  const projects = await getAllProjectTags();
	  return {
		statusCode: 200,
		headers: {
		  "Content-Type": "application/json; charset=utf-8",
		  "Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify(projects),
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
