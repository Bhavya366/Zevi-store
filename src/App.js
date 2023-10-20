import './App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import zevi from './assets/zevi.jpg';
import searchicon from './assets/search-icon.png';
import LatestTrendsPopup from './components/LatestTrends/LatestTrendsPopup';
import FiltersPopup from './components/Filters/FiltersPopup';

function App() {

  const [latestTrendsOpen, setLatestTrendsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);


  const handleSearch = (query) => {
    setSearchQuery(query);
    setLatestTrendsOpen(false);
    setFiltersOpen(true);
  };

  const generateProduct = (i) => {
    return {
      id: i,
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      imageURL: faker.image.urlLoremFlickr({
        category: faker.commerce.product(),
      }),
      price: parseFloat(faker.commerce.price()),
      description: faker.lorem.sentences(),
      rating: parseFloat(faker.finance.amount(1, 5, 2)),
      brand: faker.commerce.productName().includes("T") ? "H&M" : "Mango",
      wishlist: false,
    };
  };

  const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push(generateProduct(i));
    }
    return products;
  };

  useEffect(() => {
    // Open the LatestTrendsPopup after 3 seconds
    const timer = setTimeout(() => {
      setLatestTrendsOpen(true);
    }, 3000);

    return () => {
      // Clear the timer if the component unmounts before the 3 seconds
      clearTimeout(timer);
    };
  }, []);

  const [products, setProducts] = useState(generateProducts(40))
  // Sort the products by rating in descending order
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  // Get the top 5 products with the highest ratings
  const top5Products = sortedProducts.slice(0, 5);

  return (
    <div className="app" style={filtersOpen ?{background:"transparent"}:{backgroundColor:"white"}}>
      <div className="background-image"></div>
      <div className="top-right-image">
        <img src={zevi} alt="Top Right" />
      </div>
      <div className="search-bar" style={filtersOpen ?{border:"2px solid grey"}:{border:"none"}}>
        <input type="text" placeholder="Search" onClick={() => setLatestTrendsOpen(true)}
          onChange={(e) => { handleSearch(e.target.value) }} />
        <img src={searchicon} alt="" />
      </div>
      {latestTrendsOpen && <LatestTrendsPopup products={top5Products} />}
      {filtersOpen && <FiltersPopup searchQuery={searchQuery} products={products}/>}
    </div>
  );
}

export default App;
