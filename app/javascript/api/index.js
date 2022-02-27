import { API_URL } from "../constant";
export const readBlog = () => {
  return fetch(`${API_URL}/blogs`)
    .then((response) => response.json())
    .then((blogsArray) => blogsArray)
    .catch((errors) => console.log("Blog read errors:", errors));
};
