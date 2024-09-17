"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import Info from "./Info";
import About from "./About";
import Event from "./Event";
import Contact from "./Contact";
import BooksRecenUser from "./BooksRecenUser";
import Featured from "./Featured";
import { motion, animate } from "framer-motion";

export const FadeUp = (delay: any) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const HomeSection = () => {
  const divVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const pVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };
  const spanVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center h-screen p-2">
        <div className="w-1/2 p-8">
          <motion.h1
            variants={FadeUp(0.4)}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 -mt-8 tracking-wider text-orange-600"
            style={{ fontFamily: "brush script mt" }}
          >
            Browse &
          </motion.h1>
          <motion.h1
            variants={FadeUp(0.4)}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 -mt-4  text-orange-600"
            style={{ fontFamily: "brush script mt" }}
          >
            {" "}
            Select E-Books
          </motion.h1>
          <motion.p
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-base md:text-lg lg:text-xl mt-4  text-gray-600 leading-snug tracking-wider text-center md:text-left"
            style={{ fontFamily: "verdana" }}
          >
            Find the best e-books from your favourite writers, explore hundreds
            of books with all possible categories,  Dive into hundreds of books tailored to your interests.
          </motion.p>
          <Link href={"/allBooks"}>
            <motion.button
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="mt-4 md:mt-8 bg-orange-500 text-white border-2 border-orange-500 px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-orange-500 cursor-pointer"
            >
              Discover Books
            </motion.button>
          </Link>
        </div>
        <div className="relative w-full md:w-1/2 p-4 md:p-8 flex justify-center items-center">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src="/book-rbg.png"
            alt="Book"
            className="w-full h-auto object-cover relative z-10 drop-shadow"
          />
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src="/blob.png"
            alt="Blob"
            className="absolute bottom-0 md:bottom-[-30px] w-[400px] md:w-[800px] z-[0]"
          />
        </div>
      </div>
      <Info />
      <About />
      <BooksRecenUser />
      <Featured />
      <Event />
      <Contact />
    </>
  );
};

export default HomeSection;
