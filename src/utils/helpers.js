export const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

export const detectFileType = (file) => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "document";
};

export const languageToFlag = (code) => {
  const flags = {
    en: "🇬🇧",
    hi: "🇮🇳",
    mr: "🇮🇳",
    ta: "🇮🇳",
    te: "🇮🇳",
    kn: "🇮🇳",
    ml: "🇮🇳",
    bn: "🇮🇳",
  };
  return flags[code] || "🌐";
};