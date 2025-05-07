import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryFilter, setInStockOnly } from '../redux/productSlice';

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilterState] = useState('');
  const [inStockOnly, setInStockOnlyState] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategoryFilterState(selectedCategory);
    dispatch(setCategoryFilter(selectedCategory));
  };

  const handleStockToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inStock = e.target.checked;
    setInStockOnlyState(inStock);
    dispatch(setInStockOnly(inStock));
  };

  return (
    <div className="mb-4 flex gap-4">
      <select onChange={handleCategoryChange} value={categoryFilter} className="border p-2">
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Apparel">Apparel</option>
        <option value="Food">Food</option>
      </select>

      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={handleStockToggle} checked={inStockOnly} />
        In-Stock Only
      </label>
    </div>
  );
};

export default FilterSection;
