import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="contact"
      className="bg-orange-600 min-h-[22vh] flex flex-col justify-center items-center p-4 
      bg-[url('/bgcontact.png')]  bg-no-repeat bg-center bg-contain h-[400px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col justify-center  text-center"
      >
        <h3
          className="text-center text-white mb-3  text-lg md:text-xl"
          style={{ fontFamily: "verdana" }}
        >
          HAVE ANY QUESTIONS?
        </h3>
        <p
          className="text-center text-white w-full md:w-2/4 mx-auto text-sm md:text-base mb-2  hidden md:block"
          style={{ fontFamily: "verdana" }}
        >
          If you have any questions, feedback, or need assistance, we'd love to
          hear from you! Please feel free to reach out to us through the contact
          form below.
        </p>
        <Link href="/contact">
          <button
            className="bg-white text-blue-800 hover:bg-blue-800 hover:text-white py-2 px-4 border border-blue-800 rounded transition-colors duration-300 mt-2 "
            style={{ fontFamily: "verdana" }}
          >
            Contact Us
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
