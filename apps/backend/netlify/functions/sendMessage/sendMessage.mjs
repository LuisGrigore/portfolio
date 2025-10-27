import { createMessage } from "../../../services/message.service";
export const handler = async (event) => {
    try {
        if (event.httpMethod === "OPTIONS") {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                body: "",
            };
        }
        if (event.httpMethod === "POST") {
            const data = JSON.parse(event.body || "{}");
            const newMesage = await createMessage(data);
            return {
                statusCode: 201,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                body: JSON.stringify(newMesage),
            };
        }
        return { statusCode: 405, body: "Método no permitido" };
    }
    catch (error) {
        console.error("❌ Error en getProjects:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Error interno del servidor",
            }),
        };
    }
};
