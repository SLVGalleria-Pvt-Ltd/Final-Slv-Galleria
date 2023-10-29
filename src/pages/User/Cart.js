import { useEffect, useState } from "react";
import Quantity from "../../components/Quantity";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const admin = useSelector((state) => state?.admin?.value);
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPersentage] = useState(10);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector((state) => state?.cart?.items);

  useEffect(() => {
    const cartPrice = cartItems.reduce(
      (sum, item) => sum + (item?.price || 0),
      0
    );
    setPrice(cartPrice);
  }, [cartItems]);

  useEffect(() => {
    setDiscountPersentage(10);
  }, []);

  useEffect(() => {
    const calculatedDiscount = (price * discountPercentage) / 100;
    setDiscount(calculatedDiscount);
  }, [price, discountPercentage]);

  useEffect(() => {
    const calculatedTotalAmount = price - discount;
    setTotalAmount(calculatedTotalAmount);
  }, [price, discount]);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeProductFromCart(id));
  };
  return (
    <>
      <Helmet>
        <title>Cart - SLV Galleria</title>
        <meta
          name="description"
          content="Review and manage items in your shopping cart. Easily add or remove products, update quantities, and proceed to checkout."
        />
        <meta
          name="keywords"
          content="cart, shopping cart, manage cart, review items, update quantities, checkout"
        />
      </Helmet>
      <div>
        <div className="p-9 bg-black"></div>
        <section className="grid grid-cols-1 lg:grid-cols-3 my-12 px-[4%] gap-8">
          <div className="lg:col-span-2 bg-gray-50 p-4 border border-gray-500 border-dotted">
            <h2 className="text-xl font-mono">Shopping Cart</h2>
            <div className="border mt-1 mb-5 border-pink-900"></div>
            {cartItems.length <= 0 && (
              <Link to="/shop" className="underline hover:text-lg">
                Go to shop page
              </Link>
            )}
            {cartItems.map(({ _id, name, slug, category, price }, index) => {
              return (
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:py-5 py-5 border bg-white"
                  key={index}
                >
                  <a
                    href={`/shop/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center"
                  >
                    <img
                      src={`http://localhost:3000/api/v1/product/product-photo/${_id}`}
                      alt={name}
                      className="h-[200px]"
                    />
                  </a>
                  <div className="sm:col-span-2 flex flex-col justify-between h-[200px]">
                    <div>
                      <h3 className="text-3xl mb-1">{name}</h3>
                      <div className="flex space-x-2 font-serif">
                        <h4 className="text-pink-600">Creator:</h4>
                        <p>{admin?.name}</p>
                      </div>
                      <div className="flex space-x-2 font-serif">
                        <h4 className="text-pink-600">Category:</h4>
                        <p>{category?.name}</p>
                      </div>
                      <div className="flex space-x-2 font-serif">
                        <h4 className="text-pink-600">Price:</h4>
                        <span>&#8377; {price}</span>
                      </div>
                    </div>
                    <div className="flex space-x-5">
                      <Quantity />
                      <a href="/" className="hover:underline text-pink-900">
                        Save For Later
                      </a>
                      <a
                        href="/"
                        onClick={() => handleRemoveFromCart(_id)}
                        className="hover:underline text-pink-900"
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-50 p-4 border border-dotted border-gray-500 h-min">
            <h2 className="text-xl font-mono">Price Details</h2>
            <div className="border mt-2 mb-5 border-pink-900"></div>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <h4>Price ({cartItems?.length} items)</h4>
                <p>&#8377;{parseFloat(price).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4>Discount ({discountPercentage}%)</h4>
                <p className="text-green-600">
                  &#8377;{parseFloat(price * 0.1).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h4>Delivery Charges</h4>
                <p className="text-green-600">Free</p>
              </div>
            </div>
            <div className="border border-dashed mt-5 mb-5 border-pink-900"></div>
            <div className="flex justify-between items-center text-lg font-semibold">
              <h3 className="">Total Amount</h3>
              <p>&#8377;{parseFloat(totalAmount).toFixed(2)}</p>
            </div>
            <div className="border border-dashed mt-5 mb-5 border-pink-900"></div>
            <h4 className="text-green-600">
              You will save &#8377;{parseFloat(discount).toFixed(2)} on this
              order
            </h4>
            <div className="flex justify-center w-full py-5 px-2">
              <button className="px-5 py-2 text-white rounded-lg w-full shadow-md bg-pink-600">
                Procced to Buy
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
