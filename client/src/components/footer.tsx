import React from 'react';

const footer = () => {
  return (
    <div style={{ backgroundColor: '#f4f4f4' }}>
      <div className="max-w-2xl mx-auto py-10 text-[#000]">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Download our app </h3>
          <p> Stay fit. All day, every day. </p>
          <div className="flex justify-center my-10">
            <div className="flex items-center  w-auto rounded-lg px-4 py-2 mx-2 bg-gray-900">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-white">Download on </p>
                <p className="text-sm md:text-base text-white">
                  Google Play Store
                </p>
              </div>
            </div>
            <div className="flex items-center  w-auto rounded-lg px-4 py-2  mx-2 bg-gray-900">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-white">Download on </p>
                <p className="text-sm md:text-base text-white"> Apple Store </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-[#000]">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            © Beautiful Footer, 2021.
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <span className="px-2 border-l">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
