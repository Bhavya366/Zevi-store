import React,{useState} from 'react';
import './SingleProduct.css';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RatingBox from '../utilities/RatingBox';

const SingleProduct = ({product}) => {

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showViewProduct, setShowViewProduct] = useState(false);

    return (
        <div className="product_item">
            <div className="product_img_container">
                <div className="wishlist_icon_container">
                    {isInWishlist ? (
                        <AiFillHeart
                            color="red"
                            onClick={() => setIsInWishlist((prev) => !prev)}
                        />
                    ) : (
                        <AiOutlineHeart
                            color="red"
                            onClick={() => setIsInWishlist((prev) => !prev)}
                        />
                    )}
                </div>
                <img
                    className="product_img"
                    src={product.imageURL}
                    alt=""
                    onMouseOver={() => setShowViewProduct(true)}
                    onMouseOut={() => setShowViewProduct(false)}
                />
                {showViewProduct && (
                    <div
                        onMouseOver={() => setShowViewProduct(true)}
                        onMouseOut={() => setShowViewProduct(false)}
                        className="view_product"
                    >
                        View Product
                    </div>
                )}
            </div>
            <div>{product.name}</div>
            <div>
                <span className="org_price">Rs. {product.price-100} </span>
                <span className="dis_price">Rs. {product.price} </span>
            </div>
            <div className="rating_and_reviews_container">
                {<RatingBox rating = {product.rating}/>}(123)
            </div>
        </div>
    )
};

export default SingleProduct;