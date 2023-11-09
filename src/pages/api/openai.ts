import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const bodyContent = req.body;

      // const response = {
      //   id: "chatcmpl-8IH70v8U8ES4pP9eltekeqZgVT1rG",
      //   object: "chat.completion",
      //   created: 1699366374,
      //   model: "gpt-4-1106-vision-preview",
      //   usage: {
      //     prompt_tokens: 1176,
      //     completion_tokens: 163,
      //     total_tokens: 1339,
      //   },
      //   choices: [
      //     {
      //       message: {
      //         role: "assistant",
      //         content:
      //           "```markdown\n" +
      //           "# PROGRAMACIÓN\n" +
      //           "## CONTEXTO Y HERRAMIENTAS\n" +
      //           "### ¿Qué es programar?\n" +
      //           "- es\n" +
      //           "  - Interactuar con la máquina\n" +
      //           "    - dando\n" +
      //           "      - Instrucciones\n" +
      //           "        - para que\n" +
      //           "          - Ejecute una acción\n" +
      //           "### ¿Por qué programar?\n" +
      //           "- ya que el\n" +
      //           "  - Mundo\n" +
      //           "    - se rodea de la\n" +
      //           "      - Tecnología\n" +
      //           "        - se convierte en una\n" +
      //           "          - Necesidad\n" +
      //           "## ENCUESTA\n" +
      //           "### Datos Personales\n" +
      //           "- y una\n" +
      //           "  - Opinión\n" +
      //           "    - acerca del\n" +
      //           "      - Curso online\n" +
      //           "\n" +
      //           "### Javascript\n" +
      //           "- es un\n" +
      //           "  - Lenguaje de programación\n" +
      //           "    - de caracter\n" +
      //           "      - Genérico\n" +
      //           "```",
      //       },
      //       finish_details: { type: "stop", stop: "<|fim_suffix|>" },
      //       index: 0,
      //     },
      //   ],
      // };

      const response = await openai.chat.completions.create(
        {
          model: "gpt-4-vision-preview",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Dame el formato markmap.js en formato markdown de este mapa mental.

      No me des explicaciones de como lo haces y los problemas que te encuentras.

      No tengas en cuenta el texto que hay en las líneas que conectan los nodos del mapa mental.

      No te inventes el texto.

      Añade un emoji en cada elemento.

      Dame solo el resultado en formato markdown`,
                },
                {
                  type: "image_url",
                  image_url: { url: bodyContent.imageData },
                },
              ],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      console.dir(response, { depth: null });

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al enviar solicitud a OpenAI:", error);
      res
        .status(500)
        .json({ error: "Error al procesar la solicitud de OpenAI" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
