import React from "react";
import { motion } from "framer-motion";

const Info = () => {
  const SlideLeft = (delay:number) => {
    return {
      initial: {
        opacity: 0,
        x: 50,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          delay: delay,
          ease: "easeInOut",
        },
      },
    };
  };
  return (
    <div className="grid grid-cols-4  sm:grid-cols-2 md:grid-cols-4 gap-4 -mt-4 h-40 ">
      <motion.div 
          variants={SlideLeft(0.2)}
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center border shadow-md shadow-blue-700/50 transition duration-300 ease-in-out hover:scale-110">
        <img src="/camion.png" alt="Icon" className="w-12 h-auto" />
        <h3
          className="text-center mt-4 font-semibold text-gray-600"
          style={{ fontFamily: "verdana" }}
        >
          Fast Delivey
        </h3>
      </motion.div>
      <motion.div 
          variants={SlideLeft(0.4)}
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center border shadow-md shadow-blue-700/50 transition duration-300 ease-in-out hover:scale-110">
        <img src="/24.png" alt="Icon" className="w-16 h-auto" />
        <h3
          className="text-center mt-4 font-semibold text-gray-600"
          style={{ fontFamily: "verdana" }}
        >
          24 X 7 Services
        </h3>
      </motion.div>
      <motion.div 
            variants={SlideLeft(0.6)}
            initial="initial"
            whileInView={"animate"}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center border shadow-md shadow-blue-700/50 transition duration-300 ease-in-out hover:scale-110">
        <img src="/deal.png" alt="Icon" className="w-10 h-auto " />
        <h3
          className="text-center mt-4 font-semibold text-gray-600"
          style={{ fontFamily: "verdana" }}
        >
          Best Deal
        </h3>
      </motion.div>
      <motion.div 
              variants={SlideLeft(0.8)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center border shadow-md shadow-blue-700/50 transition duration-300 ease-in-out hover:scale-110">
        <img src="/payement.png" alt="Icon" className="w-10 h-auto" />
        <h3
          className="text-center mt-4 font-semibold text-gray-600"
          style={{ fontFamily: "verdana" }}
        >
          Secure Payement
        </h3>
      </motion.div>
    </div>
  );
};

export default Info;
