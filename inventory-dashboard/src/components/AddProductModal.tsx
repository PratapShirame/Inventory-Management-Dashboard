import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/productSlice';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: any;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // When the modal opens, check if we're editing or adding a new product
      if (selectedProduct) {
        // If editing, pre-fill the fields with the selected product details
        setName(selectedProduct.name || '');
        setCategory(selectedProduct.category || '');
        setStockQuantity(selectedProduct.stockQuantity ? String(selectedProduct.stockQuantity) : '');
        setPrice(selectedProduct.price ? String(selectedProduct.price) : '');
      } else {
        // If adding, clear all fields
        setName('');
        setCategory('');
        setStockQuantity('');
        setPrice('');
      }
    }
  }, [isOpen, selectedProduct]);

  const handleSave = () => {
    if (!name || !category || !stockQuantity || !price) {
      alert('Please fill out all fields.');
      return;
    }

    const product = {
      id: selectedProduct?.id || Date.now(),
      name,
      category,
      stockQuantity: Number(stockQuantity),
      price: Number(price),
    };

    // Dispatch the action to add or update the product
    if (selectedProduct) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 relative z-60"> {/* Ensured z-index */}
        <h2 className="text-2xl mb-4">{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
        <div className="grid gap-4">
          {/* Name Input */}
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Make sure the onChange updates the state
            className="border p-2"
            placeholder="Enter product name"
          />

          {/* Category Dropdown */}
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Update the category on change
            className="border p-2"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Food">Food</option>
          </select>

          {/* Stock Quantity Input */}
          <label>Stock Quantity</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)} // Update stock quantity on change
            className="border p-2"
            placeholder="Enter stock quantity"
          />

          {/* Price Input */}
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update price on change
            className="border p-2"
            placeholder="Enter product price"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
