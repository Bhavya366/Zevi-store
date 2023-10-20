import React from 'react';
import './LatestTrendsPopup.css';

const LatestTrendsPopup = ({ products }) => {
    console.log(products)
    return (
        <div className='latest-trends'>
            <div className='latest'>
                <h2>Latest Trends</h2>
                <div className='top-products'>{
                    products.map((product, index) => {
                        return (
                            <div key={index} className='each-product'>
                                <img src={product.imageURL} alt="" />
                                <p>{product.name}</p>
                            </div>
                        )
                    })
                } </div>
            </div>
            <div className='popular'>
                <h2>Popular suggestions</h2>
                {
                    products.map((product, index) => {
                        return (

                            <p key={index}>{product.name}</p>

                        )
                    })
                }
            </div>
        </div>
    );
};

export default LatestTrendsPopup;