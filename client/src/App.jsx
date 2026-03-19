import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollegeDetails from "./pages/CollegeDetails";
import Footer from "./components/Footer";
import UniversityList from "./pages/UniversityList";
import CollegeList from "./pages/CollegeList";
import ContactUs from "./pages/ContactUs";


import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCollege from "./pages/admin/AddCollege";
import AdminCollegeList from "./pages/admin/AdminCollegeList";
import EditCollege from "./pages/admin/EditCollege";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import Blogs from "./pages/admin/Blogs";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";
import BlogsPage from "./pages/BlogsPage";
import BlogDetail from "./pages/BlogDetail";
import SubmitBlog from "./pages/SubmitBlog";
import AdminContact from "./pages/admin/AdminContact";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserLayout from "./pages/user/UserLayout";
import UserBlogs from "./pages/user/UserBlogs";
import SavedColleges from "./pages/user/SavedColleges";
import UserEnquiries from "./pages/user/UserEnquiries";
import UserRegister from "./pages/user/UserRegister";
import AdminLocations from "./pages/admin/AdminLocations";
import UserAddCollege from "./pages/user/UserAddCollege";
import UserMyColleges from "./pages/user/UserMyColleges";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isUser = location.pathname.startsWith("/user");

  return (
    <>
      {!isAdmin && !isUser && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/universities" element={<UniversityList />} />
        <Route path="/universities/:id" element={<CollegeDetails />} />
        <Route path="/colleges" element={<CollegeList />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/submit-blog" element={<SubmitBlog />} />
        <Route path="/contact" element={<ContactUs />} />
        

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="blogs" element={<UserBlogs />} />

          <Route path="saved" element={<SavedColleges />} />

          <Route path="enquiries" element={<UserEnquiries />} />
          <Route path="add-college" element={<UserAddCollege />} />
          <Route path="edit/:id" element={<EditCollege />} />
          <Route path="my-colleges" element={<UserMyColleges />} />
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add" element={<AddCollege isAdmin={true} />} />
          <Route path="colleges" element={<AdminCollegeList />} />
          <Route path="edit/:id" element={<EditCollege isAdmin={true} />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="users" element={<Users />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="contacts" element={<AdminContact />} />
          <Route path="locations" element={<AdminLocations/>}/>
        </Route>
      </Routes>

      {!isAdmin && !isUser && <Footer />}
    </>
  );
}

export default App;
