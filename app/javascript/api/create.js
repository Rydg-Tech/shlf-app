import { API_URL } from "../constant";

export const createBlog = (newBlog) => {
  fetch(`${API_URL}/blogs`, {
    body: JSON.stringify(newBlog),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then(() => readBlog())
    .catch((errors) => console.log("Blog create errors:", errors));
};
