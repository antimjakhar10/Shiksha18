import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://shiksha18.onrender.com/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ADD CATEGORY
  const addCategory = async () => {
    if (!name || !slug) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://shiksha18.onrender.com/api/categories/add", {
        name,
        slug,
      });

      setName("");
      setSlug("");

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE CATEGORY
  const updateCategory = async () => {
    try {
      await axios.put(`https://shiksha18.onrender.com/api/categories/${editId}`, {
        name,
        slug,
      });

      setName("");
      setSlug("");
      setEditId(null);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {
    await axios.delete(`https://shiksha18.onrender.com/api/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories List</h1>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ADD CATEGORY FORM */}

      <div className="add-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={editId ? updateCategory : addCategory}
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Category Slug</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {categories
              .filter((cat) =>
                cat.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((cat, index) => (
                <tr key={cat._id}>
                  <td>#{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.slug}</td>

                  <td>
                    <button
className="edit-btn"
onClick={()=>{
setName(cat.name);
setSlug(cat.slug);
setEditId(cat._id);
}}
>
<FaEdit />
</button>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCategory(cat._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
