import { TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileInFormation = () => {
  const [disableName, setDisableName] = useState(true);
  const [disablePhone, setDisablePhone] = useState(true);
  const user = useSelector((state) => state?.user?.value);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    ...user, // Spread the product data to override defaults
  });

  const handleChangeProfile = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <form
      onSubmit={() => handleSubmit()}
      className="grid grid-cols-1 py-6 px-8 gap-14"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-6 items-center">
          <h4 className="text-lg font-medium">Personal Information</h4>
          {disableName ? (
            <span
              onClick={() => setDisableName(false)}
              className="text-sm text-pink-500 cursor-pointer font-medium"
            >
              Edit
            </span>
          ) : (
            <span
              onClick={() => setDisableName(true)}
              className="text-sm text-pink-500 cursor-pointer font-medium"
            >
              Cancel
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-5 sm:space-y-0 md:space-y-5 lg:space-y-0 sm:space-x-5 md:space-x-0 lg:space-x-5">
          <TextField
            name="name"
            value={profile.name}
            onChange={handleChangeProfile}
            disabled={disableName}
            className="p-2.5 bg-gray-100 border border-gray-300 sm:w-44 md:w-64 lg:w-56 xl:w-72"
            placeholder="Full Name"
          />
          {/* <input
            className="p-2.5 bg-gray-100 border border-gray-300 w-64 sm:w-44 md:w-64 lg:w-56 xl:w-64"
            placeholder="Last Name"
          /> */}
          {!disableName && (
            <button className="bg-pink-500 px-10 py-2.5 w-32 text-white">
              SAVE
            </button>
          )}
        </div>
        {/* <div className="flex flex-col space-y-2">
          <h4 className="text-sm">Your Gender</h4>
          <div className="flex space-x-10">
            <div className="flex space-x-3">
              <input type="radio" />
              <h5>Male</h5>
            </div>
            <div className="flex space-x-3">
              <input type="radio" />
              <h5>Female</h5>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-6 items-center">
          <h4 className="text-lg font-medium">Email Address</h4>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0">
          <TextField
            name="email"
            value={profile.email}
            onChange={handleChangeProfile}
            disabled={true}
            className="p-2.5 bg-gray-100 border border-gray-300 sm:w-44 md:w-64 lg:w-56 xl:w-72"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-6 items-center">
          <h4 className="text-lg font-medium">Mobile Number</h4>
          {disablePhone ? (
            <span
              onClick={() => setDisablePhone(false)}
              className="text-sm text-pink-500 cursor-pointer font-medium"
            >
              Edit
            </span>
          ) : (
            <span
              onClick={() => setDisablePhone(true)}
              className="text-sm text-pink-500 cursor-pointer font-medium"
            >
              Cancel
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0">
          <TextField
            name="phone"
            value={profile.phone}
            onChange={handleChangeProfile}
            disabled={disablePhone}
            className="p-2.5 bg-gray-100 border border-gray-300 w-64"
            placeholder="Mobile Number"
          />
          {!disablePhone && (
            <button className="bg-pink-500 px-10 py-2.5 w-32 text-white">
              SAVE
            </button>
          )}
        </div>
      </div>
      <button className="text-sm text-pink-500 cursor-pointer font-medium text-left">
        Deactivate Account
      </button>
    </form>
  );
};

export default ProfileInFormation;
