import React, { useEffect } from "react";
import DocCard from "../components/card/docCard";
import MapCard from "../components/card/mapCard";
import { useNavigate } from "react-router-dom";

type DocumentProps = {
  id: string;
  content: string;
};

export default function Home() {
  const [documents, setDocuments] = React.useState<DocumentProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDocs = localStorage.getItem("documents");
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  return (
    <div className="p-8 flex flex-wrap gap-4">
      <DocCard />

      <MapCard />

      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 border border-gray-300 rounded-xl w-[220px] h-[300px] my-4 hover:shadow-lg transition-shadow ml-4 shadow flex items-center justify-center cursor-pointer"
          onClick={() => navigate(`/page/${doc.id}`)}
        >
          <span className="text-xl font-medium text-center">
            {doc.content.substring(0, 20) || "Untitled Document"}
          </span>
        </div>
      ))}
    </div>
  );
}
