const SVGDiagram = ({ svgCode, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
      )}
      <div 
        className="p-4 flex justify-center bg-white"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        Right-click to save image
      </div>
    </div>
  );
};

export default SVGDiagram;