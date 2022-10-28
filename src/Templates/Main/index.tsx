// import Link from 'next/link';
import Header from '@/component/compound/Header';
import type { ReactNode } from 'react';

// import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    {/* meta data part */}
    {props.meta}

    {/* header part */}
   <Header />

    {/* children part or body part  */}
    <div className = {`dark:bg-black dark:text-slate-400 !overflow-x-hidden `}>
      <div>{props.children}</div>
    </div>

    {/* footer part */}
    
  </div>
);

export default  Main  
