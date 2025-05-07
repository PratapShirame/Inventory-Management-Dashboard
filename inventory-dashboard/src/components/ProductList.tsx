import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import AddProductModal from './AddProductModal';
import { Product } from '../product/types/Product';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const categoryFilter = useSelector((state: any) => state.products.categoryFilter);
  const inStockOnly = useSelector((state: any) => state.products.inStockOnly);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  // Apply filters to the products
  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesStock = inStockOnly ? product.stockQuantity > 0 : true;
    return matchesCategory && matchesStock;
  });

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Product
      </button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product: Product) => (
            <tr key={product.id} className="border">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.stockQuantity}</td>
              <td className="p-2">${product.price}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(product)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
