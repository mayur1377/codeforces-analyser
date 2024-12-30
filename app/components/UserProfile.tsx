import React, { useContext, useState, useEffect } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { FaCode } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

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
    isLoading
  } = useContext(UsernameContext);

  const [imgLoaded, setImgLoaded] = useState(false);
  
  // Reset image loaded state when username changes
  useEffect(() => {
    setImgLoaded(false);
  }, [username]);

  // Preload image
  useEffect(() => {
    if (userphoto) {
      const img = new Image();
      img.src = userphoto;
      img.onload = () => setImgLoaded(true);
    }
  }, [userphoto]);

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`profile-${username}`}
        initial="hidden"
        animate="visible"
        exit={{ 
          opacity: 0, 
          y: -10,
          transition: { duration: 0.2 } 
        }}
        variants={contentVariants}
        className="flex flex-col md:flex-row items-center md:items-start mb-5 flex-wrap text-center md:text-left"
      >
        <div className="relative w-[150px] h-[150px]">
          <AnimatePresence mode="wait">
            {imgLoaded && (
              <motion.img
                key={`img-${userphoto}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={userphoto}
                alt="User Photo"
                className="w-[150px] h-[150px] rounded-full absolute top-0 left-0"
              />
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-5 flex-1">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`name-${username}-${firstName}`}
                  variants={contentVariants}
                  className="font-bold text-2xl"
                >
                  {(firstName || "Hey!").toUpperCase()}
                </motion.p>
              </AnimatePresence>

              <div className="flex flex-col md:flex-row items-center md:items-start">
                <AnimatePresence mode="wait">
                  <motion.a
                    key={`username-${username}`}
                    variants={contentVariants}
                    href={`https://codeforces.com/profile/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap"
                  >
                    @{username}
                  </motion.a>
                </AnimatePresence>

                <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`friends-${username}-${friendOfCount}`}
                      variants={contentVariants}
                      className="flex items-center mx-2"
                    >
                      <FaRegUser className="mx-2" /> {friendOfCount}
                    </motion.p>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`rating-${username}-${rating}`}
                      variants={contentVariants}
                      className="flex items-center mx-2"
                    >
                      <FaArrowTrendUp className="mx-2" /> {rating}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`rank-${username}-${rank}`}
                  variants={contentVariants}
                  className="mt-3 flex items-center justify-center md:justify-start"
                >
                  <FaCode className="mx-1" /> {rank}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
              <SiCodeforces className="text-4xl hidden md:block" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={`submissions-${username}-${totalSubmissions}`}
                  variants={contentVariants}
                >
                  {totalSubmissions.toLocaleString()} submissions
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`time-${username}-${registrationTime}`}
                  variants={contentVariants}
                >
                  {registrationTime}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfile;
