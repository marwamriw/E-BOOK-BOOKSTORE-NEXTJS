import React from "react";

const Event = () => {
  return (
    <div id="event" className="p-4 min-h-[90vh]">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
        <span
          className="relative z-10 text-orange-600"
          style={{ fontFamily: "Georgia, sans-serif" }}
        >
          HAPPY READING
        </span>
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-1  w-24 md:w-[calc(25%+10px)] border-b-2 border-orange-500"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
        <div className="flex items-center justify-center">
          <p
            className="text-md text-gray-600 text-center md:text-left"
            style={{ fontFamily: "verdana" }}
          >
            <span className="font-semibold">Happy Book Day!</span>
            Today, we're celebrating the joy and wonder of reading. This special
            section is dedicated to sharing our love for books with you. Enjoy
            our handpicked book recommendations, discover fascinating insights
            about authors, and pick up useful tips to enhance your reading
            adventures. Whether you’re curling up with a classic novel or
            exploring a new genre, we hope to make your reading experience even
            more delightful. Let’s celebrate the magic of books together and
            turn every day into a joyful reading journey!
          </p>
        </div>
        <div className="flex justify-center">
          <img src="/bookday.png" alt="Book Day" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Event;
