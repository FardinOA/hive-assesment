import { gql } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import client from '@/graphQl/Client';

const graphQuery = `
  query {
    conferences {
      id
      name
      schedules {
        day
        description
        intervals {
          begin
          end
        }
      } 
    }
  }
`;
const tableHead = ['time', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'];

type fillDataType = {
  conferenceId: string;
  day: Date;
  description: string;
  begin: string;
  end: string;
};

type objectType = {
  [x: string]: any;
  day?: any;
};
const index = () => {
  const startTime: Array<fillDataType> = [];

  const [timeData, setTimeData] = useState(Array<fillDataType>);
  const [allTime, setAllTime] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            ${graphQuery}
          `,
        });
        const mySearch = new RegExp(/react/i); // search all react data
        const final = data?.conferences?.filter(
          (conference: { name: string }) => mySearch.test(conference.name)
        );
        //  console.log("final",final[0]);

        final.map((con: { id: string; schedules: any[] }) => {
          con.schedules?.map(
            (ele: { day: Date; description: string; intervals: any[] }) => {
              const newObj: fillDataType = {
                conferenceId: '',
                day: new Date(),
                description: '',
                begin: '',
                end: '',
              };
              newObj.conferenceId = con.id;
              newObj.day = ele.day;
              newObj.description = ele.description;
              ele.intervals.map((int: { end: string; begin: never }) => {
                newObj.begin = int.begin;
                newObj.end = int.end;
                allTime.push(int.begin);
                startTime.push(newObj);
              });
            }
          );
        });
        const getNumber = (t: any) => +t.replace(/:/g, '');
        startTime.sort(
          ({ begin: a }, { begin: b }) => getNumber(a) - getNumber(b)
        );
        setAllTime([...new Set([...allTime])]);
        setTimeData([...new Set([...startTime])]);
      } catch (error) {}
    };

    getData();
  }, []);

  const finalData: {
    mainKey: any;
    data: Object[];
  }[] = [];
  const getAllValidData = (
    startTime: { [x: string]: any; begin: any; day?: any }[]
  ) => {
    startTime.map((ele: { [x: string]: any; begin: any; day?: any }) => {
      const index = finalData.findIndex((object) => {
        return object.mainKey === ele.begin;
      });

      const data: Array<objectType> = [];
      const mainKey: string = '';
      const obj = { mainKey, data };
      const { begin, ...rest } = ele;

      rest.begin = begin;
      const sTime = new Date(ele.day);
      const dayNum = sTime.getDay();
      switch (dayNum) {
        case 0:
          rest.dayName = 'tue';
          break;
        case 1:
          rest.dayName = 'wed';
          break;
        case 2:
          rest.dayName = 'thu';
          break;
        case 3:
          rest.dayName = 'fri';
          break;
        case 4:
          rest.dayName = 'sat';
          break;
        case 5:
          rest.dayName = 'sun';
          break;
        case 6:
          rest.dayName = 'mon';
          break;

        default:
          break;
      }

      console.log('rest', rest);
      if (index == -1) {
        obj.data.push(rest);
        obj.mainKey = begin;
        finalData?.push(obj);
      } else {
        finalData[index]?.data.push(rest);
      }
    });
  };

  getAllValidData(timeData);

  return (
    <div className="container m-auto mt-[23rem] !overflow-x-auto ">
      <table className="border-grey-light table border-collapse border xl:table-fixed">
        <thead>
          <tr>
            {tableHead.map((ele, ind) => {
              return (
                <th
                  scope="col"
                  className={`${
                    ind >= 1 ? 'border-l-none' : 'border-grey-dark  border'
                  } item min-w-[150px] p-2 py-6 text-center font-Inter_Regular text-base font-bold capitalize lg:text-xl`}
                  key={ind}
                >
                  {ele}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {finalData?.map((ele, ind) => {
            return (
              <tr key={ind}>
                <td className="border-grey-dark  item min-w-[150px] border p-4  text-center font-Inter_Regular text-base font-bold capitalize lg:text-xl">
                  {ele.mainKey}
                </td>
                {tableHead.map((day, dayInd) => {
                  if (day != 'time')
                    return (
                      <td
                        key={dayInd}
                        className="border-grey-dark  item min-w-[150px] space-y-4 border p-4  text-center font-Inter_Regular text-base font-bold capitalize lg:text-xl"
                      >
                        {ele.data?.map((data: objectType, dataInd) => {
                          if (data.dayName == day)
                            return (
                              <Link
                                key={dataInd}
                                className="flex items-center justify-center"
                                href={`/conferences/${data.conferenceId}`}
                              >
                                <a className="space-y-4">
                                  <span className="mt-2 font-Inter_Light text-[16px]">
                                    {data.day}
                                  </span>
                                  <div
                                    className={`${
                                      finalData.length - 1 == ind
                                        ? 'border-[#1E55F9] bg-blue-50'
                                        : 'border-[#FCB12A] bg-yellow-LIGHT'
                                    } rounded-md border bg-yellow-LIGHT p-4 text-[16px] transition-all   duration-300 hover:-translate-y-1 `}
                                  >
                                    <p className="font-Inter_Light text-[#725114]">
                                      {data.description}
                                    </p>
                                    <span className="font-Inter_Light text-[12px] text-[#8B6F3B]">
                                      {' '}
                                      {data.begin}-
                                    </span>
                                    <span className="font-Inter_Light text-[12px] text-[#8B6F3B]">
                                      {data.end}
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            );
                          return null;
                        })}
                      </td>
                    );
                  return null;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default index;
