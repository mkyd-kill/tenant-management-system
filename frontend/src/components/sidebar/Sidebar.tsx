import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        className="p-2 m-2 text-gray-700 sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:static sm:flex-shrink-0`}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">MySidebar</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="#" className="text-gray-700 hover:bg-gray-100 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-100 p-2 rounded">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-100 p-2 rounded">
            Services
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-100 p-2 rounded">
            Login
          </a>
          <a
            href="#"
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded text-center"
          >
            Register
          </a>
        </nav>
      </div>

      {/* Content area (optional layout) */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Main Content</h2>
        <p className="text-gray-600 mt-4">
          This is where your main content would go.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
