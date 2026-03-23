import { Handler } from "@netlify/functions";
import { getAllSkillTags } from "../../../services/skillTags.service.js";

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
      const tags = await getAllSkillTags();
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(tags),
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Method not allowed.",
    };
  } catch (error: any) {
    console.error("Error while retreaving skill tags.", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message || "Internal server error.",
      }),
    };
  }
};
