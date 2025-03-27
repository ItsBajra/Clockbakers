import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Chocolate Cake",
      category: "Cake",
      price: 15.99,
      stock_qty: 12,
      sku: "CHOC123",
      description: "Delicious chocolate cake with rich cocoa flavor.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Strawberry Pastry",
      category: "Pastry",
      price: 5.49,
      stock_qty: 8,
      sku: "STRAW456",
      description: "Fluffy pastry with fresh strawberries and cream.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Cake',
    price: 0,
    stock_qty: 0,
    sku: '',
    description: ''
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock_qty: parseInt(newProduct.stock_qty),
      updated_at: new Date().toISOString(),
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { 
          ...p, 
          ...product,
          created_at: p.created_at
        } : p
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProductData = {
        ...product,
        id: String(products.length + 1),
        created_at: new Date().toISOString(),
      };
      setProducts([newProductData, ...products]);
    }
    
    setNewProduct({
      name: '',
      category: 'Cake',
      price: 0,
      stock_qty: 0,
      sku: '',
      description: ''
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      ...product,
      price: product.price.toString(),
      stock_qty: product.stock_qty.toString()
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingProduct(null);
            setNewProduct({
              name: '',
              category: 'Cake',
              price: 0,
              stock_qty: 0,
              sku: '',
              description: ''
            });
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${showAddForm ? 'max-h-96' : 'max-h-0'}`}>
        <form onSubmit={handleSubmitProduct} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Cake">Cake</option>
                <option value="Pastry">Pastry</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newProduct.stock_qty}
                  onChange={(e) => setNewProduct({...newProduct, stock_qty: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full h-full px-3 py-2 border rounded-lg"
                rows="4"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  category: 'Cake',
                  price: 0,
                  stock_qty: 0,
                  sku: '',
                  description: ''
                });
              }}
              className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              {editingProduct ? 'Update Product' : 'Add Product'}</button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      product.stock_qty > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock_qty > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock_qty} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{product.sku}</td>
                  <td className="px-6 py-4 max-w-xs text-gray-600">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(product.updated_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="text-pink-600 hover:text-pink-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing 1 to {products.length} of {products.length} results
        </span>
      </div>
    </div>
  );
};

export default Products;