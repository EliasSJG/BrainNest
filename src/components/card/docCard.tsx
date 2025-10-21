import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function DocCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    const newId = uuidv4();

    const savedDocs = JSON.parse(localStorage.getItem("documents") || "[]");
    savedDocs.push({ id: newId, content: "" });
    localStorage.setItem("documents", JSON.stringify(savedDocs));

    navigate(`/page/${newId}`);
  };
  return (
    <div
      className="p-4 border border-gray-300 rounded-xl w-55 h-75 my-4 hover:shadow-lg transition-shadow ml-4 shadow flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-[10rem] font-light opacity-60">+</span>
    </div>
  );
}
