import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import { AiOutlineRight } from "react-icons/ai";
import { PiAlarmFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { MdOutlineLanguage } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

const Setting = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <div className="my-6 flex flex-col">
          <div className="font-bold text-2xl">App Setting</div>
        </div>
        <div className="py-3 bg-gray-200">
          <ul className="flex flex-col bg-white py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">Alarm</li>
                  <PiAlarmFill className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">
                  notification settings are turned off.
                </span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
          </ul>
        </div>
        <div className="pb-3 bg-gray-200">
          <ul className="flex flex-col bg-white py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">
                    Account
                  </li>
                  <MdAccountCircle className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">Account info.</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">
                    Notification
                  </li>
                  <AiFillNotification className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">New 1</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">
                    Language
                  </li>
                  <MdOutlineLanguage className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">English</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">Guide</li>
                  <ImBook className="ml-2 w-3 h-3" />
                </div>
                <span className="text-gray-400 text-sm">how to adopt?</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
          </ul>
        </div>
        <div className="pb-3 bg-gray-200">
          <ul className="flex flex-col bg-white py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">Help</li>
                  <BiSolidHelpCircle className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">Help center</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <li className="text-lg font-semibold text-gray-700">About</li>
                  <FcAbout className="ml-2" />
                </div>
                <span className="text-gray-400 text-sm">About zk-paw</span>
              </div>
              <AiOutlineRight className="h-7 w-7 text-gray-500" />
            </div>
          </ul>
        </div>
        <div className="flex justify-end my-10">
          <button className="px-4 py-2 border border-red-300 text-red-400 font-semibold text-xs rounded-lg">
            Logout
          </button>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Setting;
