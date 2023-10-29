import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar2 from "../../components/NavBar/NavBar2";
import { useParams } from "react-router-dom";
import { useQueryGetSingleProduct } from "../../reactQuery/Products";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressIndicator from "../../common/Loadable/CircularProgressIndicator";

const SingleProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [inCart, setInCart] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);

  const { data, isLoading } = useQueryGetSingleProduct({ slug: slug });

  useEffect(() => {
    if (!isLoading && data?.product) {
      setProduct(data?.product);
    }
  }, [data, isLoading]);

  useEffect(() => {
    function productExists(id) {
      return cartItems.some((item) => item._id === id);
    }

    if (cartItems?.length > 0 && product?._id && productExists(product?._id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    dispatch(addProductToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product?._id));
  };

  return (
    <>
      <Helmet>
        <title>Shop - SLV Galleria</title>
        <meta
          name="description"
          content="Explore our wide range of products in our online shop. Find high-quality items, browse different categories, and make a purchase conveniently."
        />
        <meta
          name="keywords"
          content="shop, online shop, products, browse, categories, purchase"
        />
      </Helmet>
      <CircularProgressIndicator loading={isLoading} />
      <div>
        <NavBar2 />
        <div className="p-9"></div>
        <div class="bg-gray-100 py-8">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">
              <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 mb-4">
                  <img
                    class="w-full h-full object-cover"
                    src={`http://localhost:3000/api/v1/product/product-photo/${product?._id}`}
                    alt="Product"
                  />
                </div>
                <div class="flex -mx-2 mb-4">
                  <div class="w-1/2 px-2">
                    {inCart ? (
                      <button
                        class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                        onClick={() => handleRemoveFromCart()}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                        onClick={() => handleAddToCart()}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div class="w-1/2 px-2">
                    <button class="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold mb-2">{product?.name}</h2>
                <p class="text-gray-600 text-sm mb-4">
                  {product?.category?.name}
                </p>
                <div class="flex mb-4">
                  <div class="mr-4">
                    <span class="font-bold text-gray-700">Price:</span>
                    <span class="text-gray-600 ml-1">{`₹ ${product?.price}`}</span>
                  </div>
                  <div>
                    <span class="font-bold text-gray-700">Availability:</span>
                    <span class="text-gray-600 ml-1">
                      {product?.quantity <= 0 ? "Out of Stock" : "In Stock"}
                    </span>
                  </div>
                </div>
                {/* <div class="mb-4">
                  <span class="font-bold text-gray-700">Select Color:</span>
                  <div class="flex items-center mt-2">
                    <button class="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                    <button class="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                    <button class="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                    <button class="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
                  </div>
                </div> */}
                <div class="mb-4">
                  <span class="font-bold text-gray-700">Select Size:</span>
                  <div class="flex items-center mt-2">
                    <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                      5in x 5in
                    </button>
                    <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                      10in x 10in
                    </button>
                    <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                      15in x 15in
                    </button>
                  </div>
                </div>
                <div>
                  <span class="font-bold text-gray-700">
                    Product Description:
                  </span>
                  <p class="text-gray-600 text-sm mt-2">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
