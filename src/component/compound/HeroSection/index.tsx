import { ImageContainer } from '@/component/_root'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const index = () => {
  return (
    <div className="h-screen   sm:bg-gradient-to-b from-[#eed8f5] to-[#FFFFFF]  ">
        <span className="h-[490px] w-[428] ">
          <ImageContainer
            alt="logo"
            height={490}
            width={428}
            className=" w-full"
            src="/assets/images/Ornament69.png"
          />
        </span>

        <div className="absolute top-[115px] left-[calc(100%-19rem)] z-[11] flex flex-col text-[48px] transition-all duration-300 lg:!left-[3rem] lg:top-[14rem] lg:text-[96px] xl:!left-[15rem] xl:text-[120px] 2xl:!left-[19rem]    ">
          <p className="heroTitle ">react</p>
          <p className="heroTitle ">conference</p>
        </div>
        <div className=" absolute top-[5rem] left-[calc(100%-12rem)] h-[68px] w-[52px] lg:top-[11rem] lg:!left-[18rem] lg:h-[88px] lg:w-[72px] xl:!left-[34rem] xl:top-[10rem] xl:h-[98px] xl:w-[82px] 2xl:!left-[38rem] ">
          <ImageContainer
            //
            className="h-full w-full"
            alt="rectangle6"
            height={68}
            width={52}
            layout="responsive"
            src="/assets/images/3line.png"
          />{' '}
        </div>
        <div className="absolute right-[0] top-[114px] z-[10] h-[432px] w-[343px] lg:!left-[3rem] lg:top-[190px] lg:h-[632px]  lg:w-[740px] xl:!left-[20rem] 2xl:!left-[25rem]  ">
          <ImageContainer
            className="h-full w-full object-contain"
            alt="vectorShape"
            height={333}
            width={327}
            layout="responsive"
            src="/assets/images/vectorShape.png"
          />
        </div>
        <div className="absolute top-[260px] z-[11] ml-[10%] lg:left-[-3rem] lg:top-[460px] lg:w-[35rem] xl:ml-[20%] 2xl:ml-[30%] ">
          <p className="  font-normal lg:text-[1.5rem]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae similique velit facilis libero molestiae totam vero
            error culpa dolorem
          </p>
          <div className="z-[11] flex justify-center">
            <button className="mt-4 rounded-full bg-yellow p-5 px-10 transition duration-300 ease-in-out hover:-translate-y-2 xl:px-[7rem]">
              Buy Tickets{' '}
              <span>
                <ImageContainer
                  alt="arrowUp"
                  height={10}
                  width={10}
                  src="/assets/images/arrowUp.png"
                />
              </span>{' '}
            </button>
          </div>
        </div>

        <button  className= 'font-Inter_Light hidden z-[11] text-[14px] font-normal xl:inline-block absolute top-[45rem] left-[50%] '>
          <span style={{writingMode:"vertical-rl",marginBottom:'-15px'}}>Scroll Down</span>
          <span><FontAwesomeIcon  fontSize={20} icon={faCaretDown}/></span>
        </button>

        <div className="absolute left-[8%] h-[333px] w-[327px] rounded-[20px]  lg:left-[60%] lg:top-[240px] lg:h-[360px]  lg:w-[370px] xl:left-[70%] 2xl:left-[65%] 2xl:top-[290px] 2xl:h-[480px]  2xl:w-[490px] ">
          <ImageContainer
            className="h-full w-full object-contain"
            alt="rectangle1"
            height={333}
            width={327}
            layout="responsive"
            src="/assets/images/Rectangle1.png"
          />
        </div>

        <div className="absolute right-[13%] top-[50rem] h-[94px] w-[94px] transition-all duration-300 sm:right-[0] sm:left-[33%] md:right-[10rem]  lg:left-[37rem]  lg:top-[45rem] lg:h-[131px] lg:w-[131px]   xl:top-[36rem] xl:left-[46rem] 2xl:top-[46rem] 2xl:left-[60%] ">
          <ImageContainer
            //
            className="h-full w-full"
            alt="star2"
            height={94}
            width={94}
            layout="responsive"
            src="/assets/images/Star2.png"
          />
        </div>

        <div className="absolute left-[8%] top-[56rem] h-[200px] w-[157px] rounded-[20px] lg:left-[60px] lg:top-[580px] xl:left-[40px] xl:top-[430px] xl:z-[11] 2xl:top-[460px] 2xl:left-[6%] 2xl:h-[419px] 2xl:w-[329px]  ">
          <ImageContainer
            //
            className="h-full w-full"
            alt="rectangle6"
            height={200}
            width={157}
            layout="responsive"
            src="/assets/images/Rectangle6.png"
          />
        </div>
        <div className="absolute left-[90%] top-[56rem] h-[100px] w-[103px] overflow-hidden   align-middle transition-all  duration-300  sm:right-[0] md:right-[10rem] lg:left-[17rem] lg:top-[45rem] lg:h-[189px] lg:w-[196px] xl:left-[8rem] xl:top-[36rem] xl:z-[10] 2xl:left-[24rem] 2xl:top-[50rem] ">
          <ImageContainer
            //
            className="  h-full w-full   "
            alt="ornament13"
            height={100}
            width={103}
            layout="responsive"
            src="/assets/images/Ornament13.png"
          />
        </div>
      </div>
  )
}

export default index