import React, { useEffect } from "react";
import DocCard from "../components/card/docCard";
import MapCard from "../components/card/mapCard";
import { useNavigate } from "react-router-dom";

type DocumentProps = {
  id: string;
  content: string;
};

type FolderProps = {
  id: string;
  name: string;
  documents: string[];
};

export default function Home() {
  const [documents, setDocuments] = React.useState<DocumentProps[]>([]);
  const [folders, setFolders] = React.useState<FolderProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedDocs = localStorage.getItem("documents");
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
    const savedFolder = localStorage.getItem("folder");
    if (savedFolder) {
      setFolders(JSON.parse(savedFolder));
    }
  }, []);

  return (
    <div className="p-8 ">
      <div className="flex">
        <DocCard />
        <div className="mt-auto">
          <MapCard />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border border-gray-300 rounded-xl w-[220px] h-[300px] my-4 hover:shadow-lg transition-shadow ml-4 shadow flex items-center justify-center cursor-pointer"
            onClick={() => navigate(`/page/${doc.id}`)}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("documentId", doc.id);
            }}
          >
            <span className="text-xl font-medium text-center">
              {doc.content.substring(0, 20) || "Untitled Document"}
            </span>
          </div>
        ))}

        {folders.map((folder) => (
          <div
            key={folder.id}
            className="p-4 border border-gray-300 rounded-xl w-55 h-38 hover:shadow-lg transition-shadow shadow flex items-center justify-center cursor-pointer"
            onClick={() => navigate(`/folder/${folder.id}`)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const docId = e.dataTransfer.getData("documentId");

              const savedFolders = JSON.parse(
                localStorage.getItem("folder") || "[]"
              );
              const folderIndex = savedFolders.findIndex(
                (f: any) => f.id === folder.id
              );

              if (folderIndex !== -1) {
                if (!savedFolders[folderIndex].documents)
                  savedFolders[folderIndex].documents = [];
                if (!savedFolders[folderIndex].documents.includes(docId)) {
                  savedFolders[folderIndex].documents.push(docId);
                }
                localStorage.setItem("folder", JSON.stringify(savedFolders));
              }
              alert("Document added to folder!");
            }}
          >
            <span className="text-xl font-medium text-center">
              {folder.name || "Untitled Folder"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
