 
import HeroSection from '@/component/compound/HeroSection';
import Table from '@/component/compound/Table';
import { Meta } from '@/layouts/Meta/Meta';
import   Main   from '@/Templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import React from 'react'
 

const Index = () => {
  return (
      <Main
          meta={
              <Meta
                  title={AppConfig.title}
                  description={AppConfig.description}
              />
          }
      >
          <>
               
              <HeroSection />
              <Table />
          </>
      </Main>
  );
};

export default Index;
