import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";

const PDFExporter = ({ content, fileName = "sandy-export.pdf" }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Split content into pages
    const lines = doc.splitTextToSize(content, 180);
    
    let y = 20;
    for (let i = 0; i < lines.length; i++) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(lines[i], 15, y);
      y += 7;
    }
    
    doc.save(fileName);
  };
  
  return (
    <button
      onClick={exportToPDF}
      disabled={!content}
      className={`px-3 py-2 rounded-md flex items-center space-x-2 ${!content ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
    >
      <FiDownload size={16} />
      <span>Export PDF</span>
    </button>
  );
};

export default PDFExporter;