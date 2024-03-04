import axios from "axios";
const baseURL = "https://flask-api-catholic-project.onrender.com";

const currentDate = new Date();

const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();

export const saintOfTheDay = async () => {
  const response = await axios.get(
    `${baseURL}/saints/${currentMonth}_${currentDay}_${currentYear}`
  );
  console.log(response.data);
  return response.data;
};
