import axios from 'axios';

const BASE_URL = "http://localhost:8000"; // or deployed URL

export const enhanceSection = async (section: string, content: string) => {
  const res = await axios.post(`${BASE_URL}/ai-enhance`, { section, content });
  return res.data.enhanced;
};

export const saveResume = async (resume: any) => {
  const res = await axios.post(`${BASE_URL}/save-resume`, resume);
  return res.data;
};
