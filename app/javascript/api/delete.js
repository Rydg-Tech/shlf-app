import { API_URL } from "../constant";

export const deleteBlog = (id) => {
  fetch(`${API_URL}/blogs/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).then((response) => response.json().then((payload) => readBlog()));
};
