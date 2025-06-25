import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientLogos from '../ClientLogosMarquee/ClientLogos';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import BeMerchant from '../BeMarchent/BeMerchant';

const Home = () => {
    return (
        <div>
            
            <Banner/>
            <Services/>
            <ClientLogos/>
            <WhyChooseUs/>
            <BeMerchant/>
        </div>
    );
};

export default Home;