import { useState } from "react";
import axios from "axios";

export default function ImageUploader({
  setImageData,
  setResponse,
  imageData,
}) {
  const [loading, setLoading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Creamos la URL de objeto para la vista previa
      const objectUrl = URL.createObjectURL(file);
      setPreviewSrc(objectUrl);

      // Convertimos el archivo a Base64 como antes
      const base64 = await convertToBase64(file);
      setImageData(base64);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const sendToOpenAI = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/openai", { imageData });
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error sending to OpenAI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      {previewSrc != "" && (
        <div>
          <img
            src={previewSrc}
            alt="Image preview"
            className="w-64 h-auto rounded-lg shadow-md mb-4"
          />
          <button
            onClick={sendToOpenAI}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
            disabled={loading || !imageData}
          >
            {loading ? "Espera..." : "Da vida a tu mapa mental"}
          </button>
        </div>
      )}
    </div>
  );
}
