import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

import { ImageContainer } from '@/component/_root';

const menuLinks = ['about me', 'what we do', 'our work', 'blod', 'say hi'];

const index = () => {
  const [showLinks, setShowLinks] = useState<boolean>(false);

  return (
    <header className={`absolute  left-0  top-0  z-50  w-full  lg:pt-[8px] drop-shadow-lg `}>
      <div className=" relative flex  justify-center">
        {/* nav wrapper */}
        <div className="container mx-[5%] flex justify-between p-[8px_2px] transition-all duration-300">
          {/* logo */}
          <div className=" inline-flex h-[53px]   w-[120px] items-center   ">
            <ImageContainer
              alt="logo"
              height={162}
              width={534}
              src="/assets/images/logo.png"
            />
          </div>
          {/* links */}

          <div
            className={`
            bg-white
                      absolute
                      inset-x-[8%]
                      top-[133%]
                      z-[999999]
                      flex
                      flex-col
                      rounded-[18px]
                       
                      p-[4%]
                      px-[3%]
                      lg:static
                      lg:!inset-x-[0%]
                      lg:!top-[0%]
                      lg:z-[99999]
                      lg:w-[60%]
                      lg:flex-row
                      lg:justify-between
                      lg:rounded-[0px]
                      lg:!bg-[transparent]
                      lg:p-[0%]
                      lg:px-[0%]
                      ${!showLinks && `hidden lg:inline-flex`}
                    `}
          >
            {menuLinks.map((ele, ind) => (
              <Link href={'/'} key={ind}>
                <a
                  className="  
                          inline-flex 
                          items-center 
                          p-[8px_2px] 
                          font-Inter_Regular 
                          text-lg 
                          font-medium  
                          capitalize 
                          leading-[1.22em] 
                          text-blue 
                          transition-all 
                          duration-300 
                          ease-in-out 
                          hover:text-yellow 
                           "
                >
                  {ele}
                </a>
              </Link>
            ))}
          </div>

          {/* menu button */}
          <div className=" inline-flex  mt-4 h-7  w-7  items-center  ">
            <FontAwesomeIcon
              onClick={() => setShowLinks(!showLinks)}
              fontSize={30}
              icon={faBars}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default index;
