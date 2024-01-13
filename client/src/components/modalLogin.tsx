'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface ModalLoginProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const modalLogin: React.FC<ModalLoginProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span
        className="flex items-center  bg-[#E52F20] p-2 rounded-lg cursor-pointer"
        onClick={showModal}
      >
        <Icon icon="solar:smile-square-bold" color="#fce000" width={30} />
        {/* <a className="text-xs text-[#ffffff]">Sign In</a> */}
      </span>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        footer={null}
        style={{ borderRadius: '40px' }}
      >
        <section className="paddingXShorter flex flex-col justify-between gap-10">
          {/* <h3 className="my-10 text-center font-bold">Login before shoping</h3> */}
          <div className="py-8 w-full flex flex-col items-center justify-center h-full gap-6">
            <Link href={`/login`}>
              <div className="py-3 w-96 text-center rounded-full bg-[#E52F20] text-[#ffffff] cursor-pointer">
                <p>Login</p>
              </div>
            </Link>
            {/* <Link href={`/login`}>
              <div className="py-3 w-96 text-center rounded-full bg-[#E52F20] text-[#ffffff] cursor-pointer">
                <p>Logout</p>
              </div>
            </Link> */}
            <Link href={`/register`}>
              <div className="py-3 w-96 text-center rounded-full bg-[#222222a3] text-[#fff] cursor-pointer">
                <p>Daftar</p>
              </div>
            </Link>

            <Link href={`/about`}>
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                Need some help?
              </p>
            </Link>
            <p className="text-center text-xs text-[#222222a3]">
              By using this site, you automatically create or use an your
              existing AliExpress account, agree to the processing of your
              personal data and accept the terms of the User Agreements.
              personal data and accept the terms and conditions of the User
              Agreements. AliExpress. Read More
            </p>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default modalLogin;
