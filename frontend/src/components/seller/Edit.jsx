// src/components/PropertyListingForm.js
import { useState } from 'react';

const Edit = () => {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    squareFeet: '',
    monthlyFee: '',
    bedrooms: '',
    bathrooms: '',
    status: 'available',
    features: '',
    propertyType: 'apartment',
    description: '',
    depositAmount: '',
    availableDate: '',
    petPolicy: 'no-pets',
    utilities: '',
    parkingSpots: '0',
    furnished: false,
    airConditioning: false,
    laundry: 'none',
    availableUtilities: {
      water: false,
      electricity: false,
      internet: false,
      gas: false,
      trash: false
    }
  });

  // Image states
  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object for file upload
    const submitData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object') {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
    // Add images to FormData
    images.forEach((image, index) => {
      if (image) {
        submitData.append(`image${index + 1}`, image);
      }
    });

    try {
      // Example API call (replace with your actual API endpoint)
      const response = await fetch('/api/properties', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        throw new Error('Failed to submit property');
      }

      const result = await response.json();
      console.log('Property added successfully:', result);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        location: '',
        squareFeet: '',
        monthlyFee: '',
        bedrooms: '',
        bathrooms: '',
        status: 'available',
        features: '',
        propertyType: 'apartment',
        description: '',
        depositAmount: '',
        availableDate: '',
        petPolicy: 'no-pets',
        utilities: '',
        parkingSpots: '0',
        furnished: false,
        airConditioning: false,
        laundry: 'none',
        availableUtilities: {
          water: false,
          electricity: false,
          internet: false,
          gas: false,
          trash: false
        }
      });
      setImages([null, null, null, null]);
      setPreviews([null, null, null, null]);
      
    } catch (error) {
      console.error('Error submitting property:', error);
      // Handle error (show error message to user)
    }
  };

  // Form field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.startsWith('utility-')) {
        const utility = name.replace('utility-', '');
        setFormData(prev => ({
          ...prev,
          availableUtilities: {
            ...prev.availableUtilities,
            [utility]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Image upload handler
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload only JPG, PNG, or WebP images');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Update images array
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      // Create and set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image removal handler
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages[index] = null;
    newPreviews[index] = null;
    setImages(newImages);
    setPreviews(newPreviews);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl text-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Add New Property Listing</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Property Images (Up to 4)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative">
                <div className="aspect-square w-full bg-gray-700 rounded-lg overflow-hidden">
                  {previews[index] ? (
                    <>
                      <img
                        src={previews[index]}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                      <div className="text-4xl text-gray-400">+</div>
                      <div className="text-xs text-gray-400">Add Image</div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleImageChange(e, index)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Accepted formats: JPG, PNG, WebP. Max size: 5MB per image.
          </p>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Property Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter full address"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="squareFeet" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Square Feet*
              </label>
              <input
                type="number"
                id="squareFeet"
                name="squareFeet"
                required
                min="0"
                value={formData.squareFeet}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label 
                htmlFor="monthlyFee" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Monthly Rent ($)*
              </label>
              <input
                type="number"
                id="monthlyFee"
                name="monthlyFee"
                required
                min="0"
                value={formData.monthlyFee}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="bedrooms" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Bedrooms*
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                required
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label 
                htmlFor="bathrooms" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Bathrooms*
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                required
                min="0"
                step="0.5"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="propertyType" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Property Type*
            </label>
            <select
              id="propertyType"
              name="propertyType"
              required
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="studio">Studio</option>
              <option value="duplex">Duplex</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="status" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Status*
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="pending">Pending</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>

          {/* Additional Features */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Additional Features
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="furnished" className="ml-2 text-sm text-gray-200">
                  Furnished
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="airConditioning"
                  name="airConditioning"
                  checked={formData.airConditioning}
                  onChange={handleChange}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="airConditioning" className="ml-2 text-sm text-gray-200">
                  Air Conditioning
                </label>
              </div>
            </div>
          </div>

          {/* Utilities */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Included Utilities
            </label>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utility-water"
                    name="utility-water"
                    checked={formData.availableUtilities.water}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="utility-water" className="ml-2 text-sm text-gray-200">
                    Water
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utility-electricity"
                    name="utility-electricity"
                    checked={formData.availableUtilities.electricity}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="utility-electricity" className="ml-2 text-sm text-gray-200">
                    Electricity
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utility-internet"
                    name="utility-internet"
                    checked={formData.availableUtilities.internet}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="utility-internet" className="ml-2 text-sm text-gray-200">
                    Internet
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utility-gas"
                    name="utility-gas"
                    checked={formData.availableUtilities.gas}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="utility-gas" className="ml-2 text-sm text-gray-200">
                    Gas
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utility-trash"
                    name="utility-trash"
                    checked={formData.availableUtilities.trash}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="utility-trash" className="ml-2 text-sm text-gray-200">
                    Trash
                  </label>
                </div>
              </div>
            </div>

          <div>
            <label 
              htmlFor="features" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Additional Features & Amenities
            </label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="List additional features (e.g., Parking, Pool, Gym, Security)"
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Property Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed property description"
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="depositAmount" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Security Deposit ($)
              </label>
              <input
                type="number"
                id="depositAmount"
                name="depositAmount"
                min="0"
                value={formData.depositAmount}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              />
            </div>

            <div>
              <label 
                htmlFor="availableDate" 
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Available From
              </label>
              <input
                type="date"
                id="availableDate"
                name="availableDate"
                value={formData.availableDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="petPolicy" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Pet Policy
            </label>
            <select
              id="petPolicy"
              name="petPolicy"
              value={formData.petPolicy}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="no-pets">No Pets Allowed</option>
              <option value="cats-only">Cats Only</option>
              <option value="small-pets">Small Pets Allowed</option>
              <option value="all-pets">All Pets Allowed</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="parkingSpots" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Parking Spots
            </label>
            <input
              type="number"
              id="parkingSpots"
              name="parkingSpots"
              min="0"
              value={formData.parkingSpots}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label 
              htmlFor="laundry" 
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Laundry
            </label>
            <select
              id="laundry"
              name="laundry"
              value={formData.laundry}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            >
              <option value="none">No Laundry</option>
              <option value="in-unit">In Unit</option>
              <option value="in-building">In Building</option>
              <option value="nearby">Nearby</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;