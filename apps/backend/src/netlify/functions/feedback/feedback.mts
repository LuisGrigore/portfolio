import { Handler } from "@netlify/functions";
import { createFeedback } from "../../../services/feedback.service.js";

export const handler: Handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers: corsHeaders, body: "OK" };
    }

    if (event.httpMethod === "POST") {
		console.log(event.body);
      const data = JSON.parse(event.body || "{}");
      const newFeedback = await createFeedback(data);
      return {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(newFeedback),
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Método no permitido",
    };
  } catch (error: any) {
    console.error("❌ Error en feedback:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message || "Error interno del servidor",
      }),
    };
  }
};
