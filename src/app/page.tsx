"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/app/components/ImageUploader";
import MarkMapComponent from "@/app/components/markmap";

export default function Page() {
  const [imageData, setImageData] = useState(null);
  const [response, setResponse] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(response.replace(/```markdown\n/g, "").replace(/```/g, ""));
  }, [response])

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="p-4 flex flex-col mb-4 bg-amber-600">
        <h1 className="font-bold text-3xl">Reverse MarkMap ⏮</h1>
        <h3 className="font-bold text-xl">Dale vida a tus mapas mentales</h3>
      </div>
      <ImageUploader
        setImageData={setImageData}
        setResponse={setResponse}
        imageData={imageData}
      />
      <div>
        {content != "" && (
          <div>
            <div className="flex flex-col h-[calc(100vh-260px)] p-2">
              <MarkMapComponent content={content}></MarkMapComponent>
            </div>
            <div>
              <h3 className="font-bold text-xl">Respuesta en bruto</h3>
              <textarea
                className="w-full h-[300px] border-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
