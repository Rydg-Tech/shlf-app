import { API_URL } from "../constant";

export const updateBlog = (blog, id) => {
  fetch(`${API_URL}/blogs/${id}`, {
    body: JSON.stringify(blog),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  })
    .then((response) => response.json())
    .then(() => readBlog())
    .catch((errors) => console.log("Blog update errors: ", errors));
};
