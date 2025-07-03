export const GRADE_LEVELS = [
  { value: "1", label: "Grade 1" },
  { value: "2", label: "Grade 2" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export const CONTENT_TYPES = [
  { value: "story", label: "Story" },
  { value: "worksheet", label: "Worksheet" },
  { value: "lesson", label: "Lesson Plan" },
  { value: "explanation", label: "Explanation" },
];

export const DEFAULT_PROMPTS = {
  story: "Write a short story about [topic] for [grade] students in [language]",
  worksheet: "Create a worksheet about [topic] for [grade] level in [language]",
  explanation: "Explain [concept] simply for a [grade] student in [language]",
};