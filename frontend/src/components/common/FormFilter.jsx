import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Building2, Home } from 'lucide-react';
import { apiUrl, countToken } from "../common/Http";


const TreeNode = ({ label, children, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && children.length > 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="ml-4">
      <div 
        className={`flex items-center py-2 px-2 cursor-pointer rounded-lg transition-all duration-200 
          ${isHovered ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasChildren && (
          <span className="mr-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-blue-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-blue-400" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4 mr-2" />}
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
        <span className={`text-gray-300 ${isHovered ? 'text-white' : ''}`}>{label}</span>
      </div>
      {isExpanded && children && (
        <div className="ml-2 border-l border-gray-700">
          {children.map((child, index) => (
            <TreeNode 
              key={index} 
              {...child} 
              icon={child.children ? null : Building2}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PropertyTreeMenu = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  

  // Fetch categories and subcategories
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

  // Prepare tree data
  const treeData = [
    {
      label: "Main categories",
      icon: Building2,
      children: categories.map(category => ({ label: category.name })),
    },
    {
      label: "Sub categories",
      icon: Home,
      children: subCategories.map(subCategory => ({ label: subCategory.name })),
    },
  ];

  return (
    <div className="p-6  mt-10 bg-gray-900 border border-gray-800 shadow-xl w-72 rounded-xl">
      <h2 className="flex items-center mb-6 text-xl font-semibold text-white">
        <Building2 className="w-5 h-5 mr-2 text-blue-400" />
        Property Types
      </h2>
      <div className="space-y-2">
        {loader ? (
          <div>Loading...</div>
        ) : (
          treeData.map((node, index) => (
            <TreeNode key={index} {...node} />
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyTreeMenu;