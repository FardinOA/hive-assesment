import { gql } from '@apollo/client';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { ImageContainer } from '@/component/_root';
import client from '@/graphQl/Client';
import Meta from '@/layouts';
import Main from '@/Templates/Main';

const graphQuery = (conferenceId: string) => {
  return `
      query {
        conference (id:"${conferenceId}")  {
          name
          slogan
          speakers{
            firstName
            lastName
            image{
              url
            }
            company
            about
          }
        }
      }
    `;
};

type dataType = {
  image: { url: string };
  firstName: string;
  company: string;
  about: string;
};

type sideBarType = {
  text: string;
  data?: [dataType];
};

const id = ({
  data,
  conferenceName,
  slogan,
}: {
  data: Array<sideBarType>;
  conferenceName: string;
  slogan: string;
}) => {
  const arr: Array<sideBarType> = [];
  const [sideBarData, setSideBarData] = useState(arr);

  const [showSpeakers, setShowSpeakers] = useState(false);
  const [dataListName, setDataListName] = useState('');

  const [dragStartPosition, setDragStartPosition] = useState<number | null>(
    null
  );
  const [dragEnterPosition, setDragEnterPosition] = useState<number | null>(
    null
  );

  // grap element
  const dragStart = (position: number) => {
    setDragStartPosition(position);
  };
  // drop position
  const dragEnter = (position: number) => {
    setDragEnterPosition(position);
  };

  // drop element
  const dropTheElement = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newMenuList: sideBarType[] = [...sideBarData];
    const copyTheDraggedElement: sideBarType = newMenuList[dragStartPosition!]!;
    newMenuList.splice(dragStartPosition!, 1);
    newMenuList.splice(dragEnterPosition!, 0, copyTheDraggedElement);
    setSideBarData(newMenuList);
  };

  const [width, setWidth] = useState(0); // default width, detect on server.
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    if (width > 1023) setShowSpeakers(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    setWidth(window.innerWidth);
    setSideBarData(data);
    setDataListName(dataListName);
  }, []);
  console.log(sideBarData);

  return (
    <Main meta={<Meta title={'React Conference'} description={''} />}>
      <div className=" absolute left-0  top-[15%]  mx-[5%] flex w-[90%] justify-between    transition-all duration-300  lg:pt-[8px] ">
        <div className="container   flex flex-col justify-between p-[8px_2px] transition-all duration-300">
          <div>
            <p className="font-Inter_Black text-[24px] transition-all duration-300 md:text-[48px]">
              {conferenceName}
            </p>
            <p className="font-Inter_Light text-[1rem] transition-all duration-300 md:text-[20px]">
              {slogan}
            </p>
          </div>

          <div className="relative  w-full">
            {sideBarData?.map((ele: sideBarType, ind) => {
              return (
                <div key={ind}>
                  {/*  */}

                  <div
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                      dragStart(e, ind)
                    }
                    onDragEnter={(e) => dragEnter(e, ind)}
                    onDragEnd={(e) => dropTheElement(e)}
                    draggable
                    onClick={() => {
                      ele.text == 'Speakers' && setShowSpeakers(!showSpeakers);
                      setDataListName(ele.text);
                    }}
                    className={`drop-items ${
                      dataListName == ele.text && 'bg-[#FFC93E] text-white'
                    } my-8 flex h-[72px] cursor-pointer gap-12 rounded-md border p-2 transition-all duration-300 lg:w-[365px] lg:overflow-y-auto`}
                  >
                    <FontAwesomeIcon
                      //
                      className={`${
                        dataListName == ele.text ? '  text-yellow' : ''
                      } rotate-90 rounded-md bg-[#FFFCF6] p-4`}
                      icon={faArrowRightArrowLeft}
                    />{' '}
                    <span className="p-4 font-Inter_Regular  text-[20px] ">
                      {ele.text}
                    </span>
                  </div>
                  {dataListName == ele.text && ele.data ? (
                    <div
                      className={`  top-[2rem] rounded-md   bg-[#FBFBFB] p-4 lg:absolute lg:left-[50%]
                                                         lg:p-0 lg:px-4  xl:left-[40%] 2xl:left-[35%] ${
                                                           width > 1023
                                                             ? 'absolute'
                                                             : `${
                                                                 !showSpeakers &&
                                                                 `hidden lg:absolute`
                                                               }`
                                                         }
                   `}
                    >
                      {dataListName == ele.text &&
                        ele.data.map((data, dataInd) => (
                          <div
                            key={dataInd}
                            className="my-4 grid min-h-[154px] w-full grid-cols-4 content-center  gap-0 bg-white px-4"
                          >
                            <div className="  h-[88px] w-[88px] rounded-md">
                              <ImageContainer
                                className="w-full rounded-md"
                                alt="afnan"
                                height={88}
                                width={88}
                                layout="responsive"
                                src={`${
                                  data?.image?.url
                                    ? `${data.image.url}`
                                    : `/assets/images/afnna.png`
                                }`}
                              />
                            </div>

                            <div className=" col-span-3  ">
                              <p className="font-Inter_Regular text-[1rem] font-[700] leading-[19px] ">
                                {data.firstName}
                              </p>
                              <Link href={'/'}>
                                <a className="font-Inter_Regular text-[12px] font-[400] leading-[15px] text-green-600">
                                  {data.company ? `${data.company}` : 'Hided'}
                                </a>
                              </Link>
                              <p className="font-Inter_Regular text-[12px] font-[400] leading-[15px]">
                                {data.about}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <>
                      {ele.text == dataListName && ele.data == undefined ? (
                        <div
                          className={`  top-[2rem] bg-[#FBFBFB] p-4 lg:absolute lg:left-[50%]
                      lg:p-0 lg:px-4  xl:left-[40%] 2xl:left-[35%]  ${
                        !showSpeakers && ` lg:absolute`
                      }
                   `}
                        >
                          data not found
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
}): Promise<any> => {
  const sideBarData: Array<sideBarType> = [
    {
      text: 'Organizer',
    },
    {
      text: 'Speakers',
    },
    {
      text: 'Locations',
    },
    {
      text: 'Schedules',
    },
    {
      text: 'Sponsors',
    },
  ];

  try {
    const { data } = await client.query({
      query: gql`
        ${graphQuery(context.params?.id)}
      `,
    }); // get the data from api

    sideBarData[1]!.data = data?.conference?.speakers;
    console.log(sideBarData);

    return {
      props: {
        data: sideBarData,
        conferenceName: data?.conference.name,
        slogan: data?.conference.slogan,
      },
    };
  } catch (err) {
    console.log(err); // if any exception happened
  }
};

export default id;
