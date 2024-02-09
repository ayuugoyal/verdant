"use client";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default function Popup({
  name,
  image,
  description,
  date,
  time,
}: {
  name: string;
  image: string;
  description: string;
  date: string;
  time: string;
}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center rounded-2xl p-8 my-10 bg-white shadow-2xl cursor-pointer"
        onClick={openModal}
      >
        <Image src={`/${image}.png`} alt="logo" height={200} width={200} />
        <div className="mt-5 font-bold text-2xl">{name}</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" transform overflow-hidden rounded-2xl text-[#395886] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-center">
                    <Image
                      src={`/${image}.png`}
                      alt="logo"
                      height={200}
                      width={200}
                    />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center mt-5 font-medium leading-6 text-gray-900"
                  >
                    {name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      {description}
                    </p>
                  </div>

                  <div>
                    {date} {time}
                  </div>

                  <div className="mt-4 flex justify-around items-center">
                    <TiTick
                      className="w-20 h-20 text-green-500"
                      onClick={closeModal}
                    />

                    <ImCross
                      className="w-12 h-12 text-red-700"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
