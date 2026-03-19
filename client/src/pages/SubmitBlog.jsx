import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SubmitBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(
      "https://shiksha18.onrender.com/upload",
      formData,
    );

    console.log(res.data);

    setImage(res.data.image);
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || !user.id) {
      alert("Please login first");
      return;
    }

    await axios.post("https://shiksha18.onrender.com/api/blogs/add", {
      title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      category,
      description,
      content,
      author,
      image,
      userId: user.id,
    });

    alert("Blog submitted for approval");

    navigate("/blogs");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-bold mb-10 text-center">Write a Blog</h1>

      <div className="bg-white shadow-lg rounded-xl p-8">
        <form onSubmit={submitBlog} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Blog Title</label>
            <input
              placeholder="Enter Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Engineering</option>
              <option>MBA</option>
              <option>UG PG</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Short Description</label>
            <textarea
              placeholder="Write short blog description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Full Blog Content</label>
            <textarea
              rows="10"
              placeholder="Write full blog article..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Author Name</label>
            <input
              placeholder="Enter Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Blog Image</label>
            <input type="file" onChange={uploadImage} className="w-full" />
          </div>

          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg w-full text-lg">
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitBlog;
