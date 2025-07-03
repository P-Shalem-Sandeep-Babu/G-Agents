export const handleApiError = (error) => {
  console.error('API Error:', error);
  throw new Error(
    error.response?.data?.message || 
    error.message || 
    'An unknown API error occurred'
  );
};

export const validateWorksheet = (data) => {
  if (!data.gradeLevel || !data.questions) {
    throw new Error('Worksheet requires gradeLevel and questions');
  }
};