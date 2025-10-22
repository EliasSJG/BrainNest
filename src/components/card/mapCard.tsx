import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function DocCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    const newId = uuidv4();

    const savedFolder = JSON.parse(localStorage.getItem("folder") || "[]");
    savedFolder.push({ id: newId, name: "Untitled Folder", documents: [] });
    localStorage.setItem("folder", JSON.stringify(savedFolder));

    navigate(`/folder/${newId}`);
  };
  return (
    <div
      className="p-4 border border-gray-300 rounded-xl w-55 h-38 my-4 hover:shadow-lg transition-shadow ml-4 shadow flex items-center justify-center"
      onClick={handleClick}
    >
      <span className="text-[5rem] font-light opacity-60">+</span>
    </div>
  );
}
