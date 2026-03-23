import {
//   createSkill,
  getAllSkills,
  getSkillsWithTags,
} from "../../../services/skill.service.js";
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
      const encodedTags = event.queryStringParameters?.tags;

      if (encodedTags) {
        const decoded = decodeURIComponent(encodedTags);
        const tagsArray = decoded.split(",");

        const skills = await getSkillsWithTags(tagsArray);

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(skills),
        };
      }

      const skills = await getAllSkills();
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(skills),
      };
    }

    // if (event.httpMethod === "POST") {
    //   const data = JSON.parse(event.body || "{}");
    //   const newSkill = await createSkill(data);
    //   return {
    //     statusCode: 201,
    //     headers: corsHeaders,
    //     body: JSON.stringify(newSkill),
    //   };
    // }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Method not allowed.",
    };
  } catch (error: any) {
    console.error("Error while retreaving skills.", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message || "Internal server error.",
      }),
    };
  }
};
