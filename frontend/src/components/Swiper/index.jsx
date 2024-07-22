import React from "react";

import Tier from "../Tier";
// slider imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules";

function Slider({ setBaseDonationAmount, setSelectedButton, donationBoxRef }) {
  const responsiveOptions = {
    // $('body').css('background-color', 'lightblue');
    responsive: {
      0: {
        items: 1,
        dots: false,
        loop: true,
      },
      500: {
        items: 2,
        loop: true,
      },
      1200: {
        items: 3,
        center: true,
        dots: true,
        slideBy: 1,
        loop: true,
        // dotsEach: 3,
      },
    },
  };

  return (
    <>
      {/* The tiers section suing SliderJs */}
      <div className="bg-grey corner-clip-top-bottom py-15vmin mt-1">
        <div className="container-fluid">
          {/* Title */}
          <div className="titleblock ">
            <h3 style={{ textAlign: "left" }}>our</h3>
            <h1 className="text-soapboxblue">Tiers</h1>
          </div>

          {/* Tiers slider. Tried using carousel in the original index.js */}
          <div className="mb-4">
            <Swiper
              responsive={responsiveOptions}
              spaceBetween={100}
              slidesPerView={3}
              loop={true}
              freeMode={true}
              // pagination={{
              //   clickable: true
              // }}
              autoplay={{
                delay: 9500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  // spaceBetween: 20,
                },
                800: {
                  slidesPerView: 2,
                  spaceBetween: 100,
                },
                1400: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              navigation={true}
              // injectStyles={[
              //   `.slider-button-next {
              //     color: black;
              //   }`
              // ]}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
            >
              <SwiperSlide>
                <Tier
                  title="Treasure Story"
                  description="With our first tier, you are able to spread environmental literacy and get one of Captain Fanplastic books and treasure maps in the hands of an aspiring plastic pirate."
                  src="../assets/treasureStory.png"
                  amount="5"
                  index="1"
                  setBaseDonationAmount={setBaseDonationAmount}
                  setSelectedButton={setSelectedButton}
                  donationBoxRef={donationBoxRef}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Tier
                  title="Plastic Pirate"
                  description="Take a child to Captain Fanplastic’s school, where they receive a comic book, learns the value & impact of waste, transforms trash into treasure and cleans-up the environment."
                  src="../assets/plasticPirate.png"
                  amount="25"
                  index="2"
                  setBaseDonationAmount={setBaseDonationAmount}
                  setSelectedButton={setSelectedButton}
                  donationBoxRef={donationBoxRef}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Tier
                  title="Band of Pirates"
                  description="Raise a band of plastic pirates that have a #NoTrashButTreasure mindset. Give them the tools to take the message to their parents with a reusable Captain Fanplastic bag and book."
                  src="../assets/bandOfPirates.png"
                  amount="125"
                  index="3"
                  setBaseDonationAmount={setBaseDonationAmount}
                  setSelectedButton={setSelectedButton}
                  donationBoxRef={donationBoxRef}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Tier
                  title="Ship of Pirates"
                  description="Arrrgh you readyyy? Be recruited by Captain Fanplastic and join an amazing voyage that will last generations to come! By reaching our goal we are able to set sail to our next primary school."
                  src="../assets/shipOfPirates.png"
                  amount="2.500"
                  index="4"
                  setBaseDonationAmount={setBaseDonationAmount}
                  setSelectedButton={setSelectedButton}
                  donationBoxRef={donationBoxRef}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
