import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, countToken } from "../common/Http";
import Loader from "../common/Loader";
import Nostate from "../common/Nostate";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubCategories from "./SubCategories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenOne, setIsModalOpenOne] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [isModalOpenThree, setIsModalOpenThree] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // Fetch categories
  const fetchCategories = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
    });
    const result = await res.json();
    setLoader(false);
    if (result.status === 200) {
      setCategories(result.data);
    } else {
      console.log("Something went wrong");
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
    });
    const result = await res.json();
    setLoader(false);
    if (result.status === 200) {
      setSubCategories(result.data);
    } else {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Save main category
  const saveMainCategories = async (data) => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === 200) {
      toast.success("Main Category added successfully");
      fetchCategories(); // Refresh categories
    } else {
      console.log("Something went wrong");
    }
  };

  // Save subcategory
  const saveSubCategories = async (data) => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === 200) {
      toast.success("Subcategory added successfully");
      fetchSubCategories(); 
    } else {
      console.log("Something went wrong");
    }
  };

  // Update category
  const updateCategory = async (id, data) => {
    const res = await fetch(`${apiUrl}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === 200) {
      toast.success("Category updated successfully");
      fetchCategories(); // Refresh categories
    } else {
      console.log("Something went wrong");
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    const res = await fetch(`${apiUrl}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
    });
    const result = await res.json();
    if (result.status === 200) {
      toast.success("Category deleted successfully");
      fetchCategories(); 
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      {/* Main Categories Table */}
      <div className="p-6 mt-12 rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Categories</h2>
        <button onClick={() => setIsModalOpenTwo(true)} className="px-4 py-2 mb-10 font-medium text-white bg-gray-400 shadow hover:bg-blue-600 rounded-xl">
          Create
        </button>
        <div className="overflow-x-auto">
          {loader && <Loader />}
          {!loader && categories.length === 0 && <Nostate text="Categories Not Found." />}
          {categories.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="w-12 py-2 text-left">Id</th>
                  <th className="py-2 text-center">Name</th>
                  <th className="w-20 py-2 text-left">Status</th>
                  <th className="w-32 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-700">
                    <td className="py-2">{category.id}</td>
                    <td className="py-2 text-center">{category.name}</td>
                    <td className="py-2">
                      {category.status === 1 ? (
                        <span className="px-5 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Active</span>
                      ) : (
                        <span className="px-5 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">Blocked</span>
                      )}
                    </td>
                    <td className="flex gap-2 py-4">
                      <button onClick={() => updateCategory(category.id, { name: category.name, status: category.status })}>
                        <Link>
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                          </svg>
                        </Link>
                      </button>
                      <button onClick={() => deleteCategory(category.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Main Category Modal */}
      {isModalOpenTwo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Add New Main Categories</h2>
            <form onSubmit={handleSubmit(saveMainCategories)}>
              <div className="mb-4">
                <label htmlFor="Categories" className="block mb-1 text-sm text-gray-600">Category name</label>
                <input {...register("name", { required: "The name field is required" })} type="text" id="name" className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block mb-1 text-sm text-gray-600">Status</label>
                <select {...register("status", { required: "The status field is required" })} className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300">
                  <option value="1">Active</option>
                  <option value="0">Blocked</option>
                </select>
                {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
              </div>
              <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
            </form>
            <button onClick={() => setIsModalOpenTwo(false)} className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600">Close</button>
          </div>
        </div>
      )}

      {/* Create Sub Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Add New Sub Categories</h2>
            <form onSubmit={handleSubmit(saveSubCategories)}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 text-sm text-gray-600">Sub category name</label>
                <input {...register("name", { required: "The name field is required" })} type="text" id="name" className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block mb-1 text-sm text-gray-600">Status</label>
                <select {...register("status", { required: "The status field is required" })} className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:ring-blue-300">
                  <option value="1">Active</option>
                  <option value="0">Blocked</option>
                </select>
                {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
              </div>
              <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
            </form>
            <button onClick={() => setIsModalOpen(false)} className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600">Close</button>
          </div>
        </div>
      )}

      <SubCategories/>
    </div>
  );
};

export default Categories;
