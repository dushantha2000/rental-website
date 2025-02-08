import React, { useState, useEffect } from "react";
import { apiUrl, countToken } from "../common/Http";
import { toast } from "react-toastify";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    squareFeet: "",
    monthlyFee: "",
    status: "available",
    features: [],
    images: [],
    category_id: "",
    sub_category_id: "",
    description: "",
    user_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo) {
      setFormData((prev) => ({
        ...prev,
        user_id: adminInfo.id,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureAdd = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      squareFeet: "",
      monthlyFee: "",
      status: "available",
      features: [],
      images: [],
      category_id: "",
      sub_category_id: "",
      description: "",
      user_id: formData.user_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("squareFeet", formData.squareFeet);
    formDataToSend.append("monthlyFee", formData.monthlyFee);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("sub_category_id", formData.sub_category_id);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("user_id", formData.user_id);

    // Append features as JSON
    formData.features.forEach((feature, index) => {
      formDataToSend.append(`features[${index}]`, feature);
    });

    // Append images
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });

    try {
      const res = await fetch(`${apiUrl}/properties`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${countToken()}`,
        },
        body: formDataToSend,
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success("Property added successfully");
        resetForm();
      } else {
        toast.error(result.message || "Error adding property");
        if (result.errors) {
          Object.values(result.errors).forEach((error) => {
            toast.error(error[0]);
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoader(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${countToken()}`,
      },
    });
    const result = await res.json();

    if (result.status === 200) {
      setCategories(result.data);
    } else {
      console.log("Something went wrong");
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/subCategories`, {
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

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <div className="max-w-4xl overflow-hidden">
        <div className="p-8">
          <h2 className="mb-8 text-3xl font-bold text-center text-white">
            Add New Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
            {/* ... (keep all your existing form fields) ... */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Property Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Location Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Square Feet Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Square Feet
                </label>
                <input
                  type="number"
                  step="100"
                  pattern="[0-9]*"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleInputChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace("-", ""))
                  }
                  className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Monthly Fee Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Monthly Fee
                </label>
                <input
                  type="number"
                  step="500"
                  pattern="[0-9]*"
                  name="monthlyFee"
                  value={formData.monthlyFee}
                  onChange={handleInputChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace("-", ""))
                  }
                  className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Status Select */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="pending">Pending</option>
                  <option value="underMaintenance">Under Maintenance</option>
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Category
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category Select */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Sub category
                </label>
                <select
                  name="sub_category_id"
                  value={formData.sub_category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a subcategory</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full h-32 px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Features Section */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Features
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={handleFeatureAdd}
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Images
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-400">
                    <label className="relative font-medium text-blue-500 bg-gray-700 rounded-md cursor-pointer hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span className="px-4 py-2">Upload files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-gray-400">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center text-gray-400 bg-gray-700 rounded-lg aspect-square"
                  >
                    Image {index + 1}
                  </div>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-[1.02] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loader ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </div>
              ) : (
                "Add Property"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;