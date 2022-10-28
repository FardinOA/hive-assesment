import client from "@/graphQl/Client";
import { gql } from "@apollo/client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
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
const tableHead = ["time", "tue", "wed", "thu", "fri", "sat", "sun", "mon"];

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
    let startTime: Array<fillDataType> = [];

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
                const mySearch = new RegExp(/react/i); //search all react data
                const final = data?.conferences?.filter(
                    (conference: { name: string }) =>
                        mySearch.test(conference.name)
                );
                //  console.log("final",final[0]);

                final.map((con: {
                  id: string; schedules: any[] 
}) => {
                    con.schedules?.map((ele: {
                      day: Date;
                      description: string; intervals: any[] 
}) => {
                        let newObj: fillDataType = {
                          conferenceId: "",
                          day:new Date,
                          description: "",
                          begin: "",
                          end: ""
                        };
                        newObj.conferenceId = con.id;
                        newObj.day = ele.day;
                        newObj.description = ele.description;
                        ele.intervals.map((int: {
                          end: string; begin: never 
}) => {
                            newObj.begin = int.begin;
                            newObj.end = int.end;
                            allTime.push(int.begin);
                            startTime.push(newObj);
                        });
                    });
                });
                const getNumber = (t:any) => +t.replace(/:/g, "");
                startTime.sort(
                    ({ begin: a }, { begin: b }) => getNumber(a) - getNumber(b)
                );
                setAllTime([...new Set([...allTime])]);
                setTimeData([...new Set([...startTime])]);
            } catch (error) {}
        };

        getData();
    }, []);

    let finalData: {
      mainKey: any; data: Object[]; 
}[] = [ ];
    const getAllValidData = (  startTime: { [x: string]: any; begin: any; day?: any; }[]) => {
        startTime.map((ele: { [x: string]: any; begin: any; day?: any; }) => {
            const index = finalData.findIndex((object) => {
                return object.mainKey === ele.begin;
            });
            
             let data: Array<objectType>=[]
             let mainKey:string=''
            let obj = { mainKey,data };
            const { begin, ...rest } = ele;


            rest.begin = begin;
            const sTime = new Date(ele.day);
            const dayNum = sTime.getDay();
            switch (dayNum) {
                case 0:
                    rest.dayName = "tue";
                    break;
                case 1:
                    rest.dayName = "wed";
                    break;
                case 2:
                    rest.dayName = "thu";
                    break;
                case 3:
                    rest.dayName = "fri";
                    break;
                case 4:
                    rest.dayName = "sat";
                    break;
                case 5:
                    rest.dayName = "sun";
                    break;
                case 6:
                    rest.dayName = "mon";
                    break;

                default:
                    break;
            }

            console.log("rest", rest);
            if (index == -1) {
                obj.data.push(rest);
                obj.mainKey = begin;
                finalData?.push(obj);
            } else {
                finalData[index]?.data.push(rest);
            }
        });
    };

    getAllValidData(  timeData);
    console.log(finalData);

    return (
        <div className="container m-auto mt-[13rem] !overflow-x-auto ">
            <table className="table border-collapse border border-grey-light xl:table-fixed">
                <thead>
                    <tr>
                        {tableHead.map((ele, ind) => {
                            return (
                                <th
                                    scope="col"
                                    className={`${
                                        ind >= 1
                                            ? "border-l-none"
                                            : "border  border-grey-dark"
                                    } item capitalize min-w-[150px] py-6 p-2 text-center font-Inter_Regular text-base font-bold lg:text-xl`}
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
                                <td className="border  border-grey-dark item capitalize min-w-[150px]  p-4 text-center font-Inter_Regular text-base font-bold lg:text-xl">
                                    {ele.mainKey}
                                </td>
                                {tableHead.map((day, dayInd) => {
                                    if (day != "time")
                                        return (
                                            <td
                                                key={dayInd}
                                                className="border  border-grey-dark item capitalize min-w-[150px] space-y-4  p-4 text-center font-Inter_Regular text-base font-bold lg:text-xl"
                                            >
                                                {ele.data?.map(
                                                    (data:objectType, dataInd) => {
                                                        if (data.dayName == day)
                                                            return (
                                                                <Link
                                                                    key={
                                                                        dataInd
                                                                    }
                                                                    className="flex justify-center items-center"
                                                                    href={`/conferences/${data.conferenceId}`}
                                                                >
                                                                    <a className="space-y-4">
                                                                        <span className="text-[16px] mt-2 font-Inter_Light">
                                                                            {
                                                                                data.day
                                                                            }
                                                                        </span>
                                                                        <div
                                                                            className={`${
                                                                                finalData.length -
                                                                                    1 ==
                                                                                ind
                                                                                    ? "bg-blue-50 border-[#1E55F9]"
                                                                                    : "bg-yellow-LIGHT border-[#FCB12A]"
                                                                            } bg-yellow-LIGHT text-[16px] transition-all duration-300 hover:-translate-y-1 p-4   rounded-md border `}
                                                                        >
                                                                            <p className="font-Inter_Light text-[#725114]">
                                                                                {
                                                                                    data.description
                                                                                }
                                                                            </p>
                                                                            <span className="font-Inter_Light text-[12px] text-[#8B6F3B]">
                                                                                {" "}
                                                                                {
                                                                                    data.begin
                                                                                }
                                                                                -
                                                                            </span>
                                                                            <span className="font-Inter_Light text-[12px] text-[#8B6F3B]">
                                                                                {
                                                                                    data.end
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            );
                                                            else return null;
                                                    }
                                                )}
                                            </td>
                                        );
                                        else return null;
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
