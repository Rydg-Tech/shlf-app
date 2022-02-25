export const readBlog = () => {
    return fetch("http://localhost:3000/blogs")
      .then((response) => response.json())
      .then((blogsArray) => blogsArray)
      .catch((errors) => console.log("Blog read errors:", errors));
  }


