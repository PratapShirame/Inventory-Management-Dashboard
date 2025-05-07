import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductList from './components/ProductList';
import FilterSection from './components/FilterSection';
import CategoryChart from './components/CategoryChart';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Inventory Management Dashboard</h1>
        <FilterSection />
        <ProductList />
        <CategoryChart />
      </div>
    </Provider>
  );
};

export default App;
