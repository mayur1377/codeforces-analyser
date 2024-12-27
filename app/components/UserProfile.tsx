import React, { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { FaCode } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";

const UserProfile: React.FC = () => {
  const {
    userphoto,
    firstName,
    username,
    friendOfCount,
    rating,
    rank,
    totalSubmissions,
    registrationTime,
  } = useContext(UsernameContext);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start mb-5 flex-wrap text-center md:text-left">
      <img
        src={userphoto}
        alt="User Photo"
        className="w-[150px] h-[150px] rounded-full"
      />
      <div className="mt-4 md:mt-0 md:ml-5 flex-1">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
          <div>
            <p className="font-bold text-2xl">{(firstName || "Hey!").toUpperCase()}</p>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Username as a clickable link */}
              <a
                href={`https://codeforces.com/profile/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                @{username}
              </a>
              {/* Friend Count and Rating */}
              <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
                <p className="flex items-center mx-2">
                  <FaRegUser className="mx-2" /> {friendOfCount}
                </p>
                <p className="flex items-center mx-2">
                  <FaArrowTrendUp className="mx-2" /> {rating}
                </p>
              </div>
            </div>
            {/* Rank below username */}
            <p className="mt-3 flex items-center justify-center md:justify-start">
              <FaCode className="mx-1" /> {rank}
            </p>
          </div>
          {/* Other details */}
          <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
            {/* Show the Codeforces logo only on medium and larger screens */}
            <SiCodeforces className="text-4xl hidden md:block" />
            <p>{totalSubmissions.toLocaleString()} submissions</p>
            <p>{registrationTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
