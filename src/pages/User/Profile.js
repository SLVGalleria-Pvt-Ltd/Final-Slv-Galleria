import { useState } from "react";
import Avatar from "react-avatar";
import { Helmet } from "react-helmet";
import { BiChevronRight } from "react-icons/bi";
import { BsFillFolderFill, BsFillSuitHeartFill } from "react-icons/bs";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileInFormation from "./ProfileInFormation";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const userName = user?.name;
  const [sidePage, setSidePage] = useState("profile_information");

  function handleSidePageClick(value) {
    setSidePage(value);
  }

  return (
    <>
      <Helmet>
        <title>Profile - SLV Galleria</title>
        <meta
          name="description"
          content="Discover who we are, our mission, and our commitment to serving our customers. Learn about our company's history, values, and the team behind our success."
        />
        <meta
          name="keywords"
          content="about us, company history, mission, values, team, customer service"
        />
      </Helmet>
      <div>
        <div className="p-9 bg-black"></div>
        <section className="py-5 md:px-2 px-[5%] xl:px-[5%] bg-gray-200">
          <div className="grid md:grid-cols-12 md:gap-2 gap-5 xl:gap-5">
            <div className="hidden md:flex md:col-span-4 lg:col-span-3 col-span-3 flex-col md:space-y-2 space-y-5 xl:space-y-5 h-min">
              <div className="bg-white flex space-x-3 items-center p-3">
                <Avatar name={userName} round={true} size="40" />
                {/* <img
                  src="/images/1.jpg"
                  className="rounded-full h-14 w-14 bg-gray-500"
                /> */}
                <div>
                  <p className="text-[13px]">Hello,</p>
                  <h5 className="font-medium">{userName}</h5>
                </div>
              </div>
              <div className="bg-white flex flex-col">
                <Link
                  to="/orders"
                  className="flex items-center justify-between p-5 text-gray-500 hover:text-pink-500"
                >
                  <div className="flex items-center space-x-3">
                    <BsFillSuitHeartFill className="text-pink-500 text-2xl" />
                    <h5 className="text-lg font-medium">MY ORDERS</h5>
                  </div>
                  <BiChevronRight className="text-3xl text-gray-500" />
                </Link>
                <div className="border-b border-gray-200"></div>
                <div to="/orders" className="flex flex-col py-5">
                  <div className="flex items-center space-x-3 px-5 pb-5">
                    <FaUserAlt className="text-pink-500 text-2xl" />
                    <h5 className="text-lg text-gray-500">ACCOUNT SETTINGS</h5>
                  </div>
                  <div className="flex flex-col">
                    <h3
                      className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3 cursor-pointer"
                      onClick={() => handleSidePageClick("profile_information")}
                    >
                      Profile Information
                    </h3>
                    <h3
                      className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3 cursor-pointer"
                      onClick={() => handleSidePageClick("manage_addresses")}
                    >
                      Manage Addresses
                    </h3>
                    <h3
                      className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3 cursor-pointer"
                      onClick={() =>
                        handleSidePageClick("pan_card_information")
                      }
                    >
                      PAN Card Information
                    </h3>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                <div to="/orders" className="flex flex-col py-5">
                  <div className="flex items-center space-x-3 px-5 pb-5">
                    <FaWallet className="text-pink-500 text-2xl" />
                    <h5 className="text-lg text-gray-500">PAYMENTS</h5>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      Gift Cards
                    </h3>
                    <h3 className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      Saved UPI
                    </h3>
                    <h3 className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      Saved Cards
                    </h3>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                <div to="/orders" className="flex flex-col py-5">
                  <div className="flex items-center space-x-3 px-5 pb-5">
                    <BsFillFolderFill className="text-pink-500 text-2xl" />
                    <h5 className="text-lg text-gray-500">MY STUFF</h5>
                  </div>
                  <div className="flex flex-col">
                    <Link className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      My Coupons
                    </Link>
                    <Link className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      All Notifications
                    </Link>
                    <Link className="hover:text-pink-600 hover:bg-pink-50 ps-14 py-3">
                      My Wishlist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9 bg-white h-min">
              {sidePage === "profile_information" && <ProfileInFormation />}
              <img
                src="/images/profileFooter.png"
                alt="Profile Footer"
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
