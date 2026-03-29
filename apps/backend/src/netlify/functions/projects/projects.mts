import type { Handler } from "@netlify/functions";
import {
  getProjectsWithTags,
} from "../../../services/project.service.js";

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
      const encodedTags = event.queryStringParameters?.tags;
	  const page = Number(event.queryStringParameters?.page) || 1;

	  const tagsArray = encodedTags ? decodeURIComponent(encodedTags).split(",") : [];

        const projects = await getProjectsWithTags(tagsArray, page);

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(projects),
        };
    }

    // if (event.httpMethod === "POST") {
    //   const data = JSON.parse(event.body || "{}");
    //   const newProject = await createProject(data);
    //   return {
    //     statusCode: 201,
    //     headers: corsHeaders,
    //     body: JSON.stringify(newProject),
    //   };
    // }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Method not allowed.",
    };
  } catch (error: any) {
    console.error("Error while retreaving projects.", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message || "Internal server error.",
      }),
    };
  }
};