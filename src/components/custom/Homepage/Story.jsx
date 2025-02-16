import React from "react";
import { getStrapiURL } from "@/lib/utils";

const Story = ({ response }) => {
  // story is now an array with two media files: index 0 for mobile, index 1 for desktop
  const story = response?.data?.story;

  return (
    <div className="story mt-12 mb-12 xl:ml-10 flex flex-col lg:flex-row items-center lg:items-start">
      {/* Video Section */}
      <div className="video w-full lg:w-1/2 relative">
        <a href="#">
          {story?.[0]?.url && story?.[1]?.url ? (
            <>
              {/* Mobile video for screens less than md */}
              <video
                src={`${getStrapiURL()}${story[0].url}`}
                autoPlay
                loop
                muted
                className="w-full h-auto block md:hidden"
                type="video/mp4"
              ></video>
              {/* Desktop video for screens md and above */}
              <video
                src={`${getStrapiURL()}${story[1].url}`}
                autoPlay
                loop
                muted
                className="w-full h-auto hidden md:block"
                type="video/mp4"
              ></video>
            </>
          ) : (
            <p className="text-center text-gray-500">Video not available</p>
          )}
        </a>
      </div>

      {/* Content Section */}
      <div className="content text-customGray w-full lg:w-1/2 px-6 py-8 lg:py-0 lg:px-12 flex flex-col justify-center text-center items-center lg:h-screen">
        <div className="content-wrapper max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-primary leading-none mb-4">
            <i>The</i>
            <br />
            KUMARI <br />
            STORY
          </h2>
          <p className="text-sm font-secondary my-5">
            Kumari is created for the heart. Remarkable designs and high
            aesthetics drive us to create Wearable Wonders that let you live
            every day looking just that extra stylish. Know more about vision.
          </p>
          <div className="mt-4 flex justify-center items-center text-center text-white">
            <a
              href="#"
              className="bg-black w-[200px] uppercase px-10 py-4 font-secondary text-sm"
            >
              about us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
