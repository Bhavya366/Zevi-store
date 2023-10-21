import React, { useEffect, useState } from 'react';
import './FiltersPopup.css'
import SingleProduct from '../Eachproduct/SingleProduct';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import RatingBox from '../utilities/RatingBox';
import searchicon from '../../assets/search-icon.png';

const FiltersPopup = (props) => {
    const [showBrandFilter, setShowBrandFilter] = useState(false);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [showRatingFilter, setShowRatingFilter] = useState(false);
    const [initialproducts, setInitialProducts] = useState(props.products);
    const [filteredProducts, setFilteredProducts] = useState(props.products)
    const [filterName, setFilterName] = useState(props.searchQuery)
    const [changed, setChanged] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedPrice, setSelectedPrice] = useState([])
    const [selectedRating, setSelectedRating] = useState([])



    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        
        if (event.target.name === "brand") {
            const updatedBrands = [...selectedBrands];
            const index = updatedBrands.indexOf(value);

            if (index === -1) {
                updatedBrands.push(value);
            } else {
                updatedBrands.splice(index, 1);
            }
            setSelectedBrands(updatedBrands);
            let prods = filteredProducts.length > 0 ? filteredProducts : initialproducts
            const filtered = prods.filter(product =>
                selectedBrands.length === 0 || selectedBrands.includes(product.brand)
            );
            setFilteredProducts(filtered);
            if (filteredProducts.length == 0) {
                setFilteredProducts(initialproducts)
            }
            setChanged((prev) => !prev)
        }
        if (event.target.name === "price") {
            const updatedPriceRanges = [...selectedPrice];
            const index = updatedPriceRanges.indexOf(value);
            if (index === -1) {
                updatedPriceRanges.push(value);
            } else {
                updatedPriceRanges.splice(index, 1);
            }
            setSelectedPrice(updatedPriceRanges);
            let prods = filteredProducts.length > 0 ? filteredProducts : initialproducts
            const filtered = prods.filter(product =>
            (
                (selectedPrice.includes('Under 500') && product.price < 500) ||
                (selectedPrice.includes('1000 to 3000') && product.price >= 1000 && product.price <= 3000)
            )
            );
            setFilteredProducts(filtered);

            if (filteredProducts.length == 0) {
                setFilteredProducts(initialproducts)
            }
            setChanged((prev) => !prev)
        }
        if (event.target.name === "rating") {
            const updatedRatings = [...selectedRating];
            const index = updatedRatings.indexOf(Number(value));
            
            if (index === -1) {
                updatedRatings.push(Number(value));
            } else {
                updatedRatings.pop(Number(value));
            }
            
            setSelectedRating(updatedRatings);
            let prods = filteredProducts.length > 0 ? filteredProducts : initialproducts
            
            const filtered = prods.filter(product =>
               selectedRating.includes(product.rating)
            );
            
            setFilteredProducts(filtered);
            if (filteredProducts.length == 0) {
                setFilteredProducts(initialproducts)
            }
            setChanged((prev) => !prev)
        }

    };

    useEffect(() => {
        if (filteredProducts.length == 0) {
            setFilteredProducts(initialproducts)
        }
        setChanged((prev) => !prev)
        const filtered = initialproducts.filter(product =>
            product.name.toLowerCase().includes(filterName)
        );

        setFilteredProducts(filtered);
        setChanged((prev) => !prev)
    }, [filterName, selectedBrands, selectedPrice])



    return (
        <div className='main-section'>
            <center><div className="search-bar" >
                <input type="text" placeholder="Search" value={filterName}
                    onChange={(e) => { setFilterName(e.target.value) }} />

                <img src={searchicon} alt="" />
            </div></center>
            <h2>Search Results</h2>
            <div className='filters-section'>
                <div className='filter-options'>
                    <div className="">
                        <div
                            onClick={() => setShowBrandFilter((prev) => !prev)}
                            className="dropdown_container"
                        >
                            <div className="filter_title">BRAND</div>
                            {showBrandFilter ? (
                                <BiChevronUp size={24} />
                            ) : (
                                <BiChevronDown size={24} />
                            )}
                        </div>
                        {showBrandFilter && (
                            <div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="brand"
                                        value="Mango"
                                        onChange={handleFilterChange}

                                    />
                                    <label>Mango</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="brand"
                                        value="H&M"
                                        onChange={handleFilterChange}
                                    />
                                    <label>H&M</label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="filter_divider"></div>
                    <div className="">
                        <div
                            onClick={() => setShowPriceFilter((prev) => !prev)}
                            className="dropdown_container"
                        >
                            <div className="filter_title">PRICE RANGE</div>
                            {showPriceFilter ? (
                                <BiChevronUp size={24} />
                            ) : (
                                <BiChevronDown size={24} />
                            )}
                        </div>
                        {showPriceFilter && (
                            <div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="price"
                                        value="Under 500"
                                        onChange={handleFilterChange}
                                    />
                                    <label>Under 500</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="price"
                                        value="1000-3000"
                                        onChange={handleFilterChange}
                                    />
                                    <label>1000 to 3000</label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="filter_divider"></div>
                    <div className="">
                        <div
                            onClick={() => setShowRatingFilter((prev) => !prev)}
                            className="dropdown_container"
                        >
                            <div className="filter_title">RATINGS</div>
                            {showRatingFilter ? (
                                <BiChevronUp size={24} />
                            ) : (
                                <BiChevronDown size={24} />
                            )}
                        </div>
                        {showRatingFilter && (
                            <div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={5}
                                        onChange={handleFilterChange}

                                    />
                                    <label>{<RatingBox rating={5} />}</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={4}
                                        onChange={handleFilterChange}

                                    />
                                    <label>{<RatingBox rating={4} />}</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={3}
                                        onChange={handleFilterChange}

                                    />
                                    <label>{<RatingBox rating={3} />}</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={2}
                                        onChange={handleFilterChange}

                                    />
                                    <label>{<RatingBox rating={2} />}</label>
                                </div>
                                <div className="input_label_container">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={1}
                                        onChange={handleFilterChange}

                                    />
                                    <label>{<RatingBox rating={1} />}</label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='all-products'>
                    {changed ? filteredProducts.map((product, index) => {
                        return (
                            <SingleProduct product={product} key={index} />
                        )
                    }) : filteredProducts.map((product, index) => {
                        return (
                            <SingleProduct product={product} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>

    );
};

export default FiltersPopup;