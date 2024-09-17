import React from "react";


const About = () => {
  return (
    <div className="p-4 min-h-[90vh]" id="about">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 mt-24">
        <span
          className="relative z-10 text-orange-600"
          style={{ fontFamily: "Georgia, sans-serif" }}
        >
          ABOUT US
        </span>
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-1 mb-4 w-24 md:w-[calc(15%+10px)] border-b-2 border-orange-500"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-8 md:mt-16 h-auto">
        <div className="flex justify-center">
          <img src="/2about.png" alt="About" className="w-full h-auto" />
        </div>
        <div className="flex items-center justify-center">
          <p
            className=" text-md md:text-md text-gray-600 text-center md:text-left"
            style={{ fontFamily: "verdana" }}
          >
            Welcome to our ebook application, your ultimate destination for a
            diverse range of digital books. Our platform is designed to cater to
            book enthusiasts of all genres and interests. We are committed to
            providing an exceptional reading experience by offering a vast
            collection of ebooks from various authors and publishers worldwide.
            Whether you are looking for the latest bestsellers, classic
            literature, or niche genres, our intuitive and user-friendly
            interface makes it easy to discover and enjoy your favorite books.
            Join our community of readers today and embark on a literary journey
            with us. Happy reading!.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
