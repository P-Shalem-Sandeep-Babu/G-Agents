export const formatWorksheet = (text) => {
  return text
    .replace(/### (.*?)\n/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export const truncate = (str, n = 100) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};