import { useState } from 'react';
import Navbar from '../components/navbar';
import bgPattern from '../assets/Bgpattern.png';
import Users from '../pages/Admin/Users';
import Products from '../pages/Admin/Products';
import Orders from '../pages/Admin/Orders';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Users', id: 'users' },
    { name: 'Products', id: 'products' },
    { name: 'Orders', id: 'orders' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <Users />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen flex items-center justify-center bg-red-100 p-4" 
        style={{ backgroundImage: `url(${bgPattern})` }}
      >
        <div className="w-full max-w-full md:max-w-[190vh] min-h-[75vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden bg-pink-600 text-white p-4"
          >
            ☰ Menu
          </button>

          {/* Sidebar */}
          <div className={`bg-pink-600 text-white w-full md:w-64 flex-shrink-0 px-4 py-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'block' : 'hidden md:block'
          }`}>
            <h2 className="text-2xl font-bold mb-8 px-2">Admin Panel</h2>
            <nav>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-gray-900 text-white'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
