import React from 'react'
import { useGetNewsFeedsQuery, useGetPartnershipsQuery } from '../../api/hooks';
import Marquee from '../../components/common/Marquee/Marquee';
import Image from '../../components/common/Image';
import { PartnershipContainer, PartnershipItem } from './Partnership.styled';
import Button from '../../components/common/Button';
import ProviderTitle from '../../features/Games/ProviderTitle';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function Partnership() {
    const { t } = useTranslation();
    const {data: newsFeeds} = useGetNewsFeedsQuery();
    const {data: partnerships} = useGetPartnershipsQuery();
    const { partnership_title } = useSelector(selectConfigData);
    
    return (
        <div>
            <Marquee text={newsFeeds?.map(feed=>({id: feed.id, text: feed.text}))} />
            <PartnershipContainer>
                <ProviderTitle provider={partnership_title}/>
                {
                    partnerships?.map(partnership=>(
                    <PartnershipItem key={partnership.id}>
                        <a href={partnership.url} target='_blank'>
                        <Image key={partnership.id} src={partnership.logo} alt={partnership.name} 
                            height="100px" 
                            width="100px" 
                            skeletonHeight="150px" 
                            style={{
                                borderRadius: '50%',
                                marginBottom: '8px',
                                animationName: 'blinker',
                                animationDuration: '1.5s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <Button 
                        $width="100%"
                        $height="100%"
                        $padding="10px"
                        $borderRadius="20px"
                        >
                            {partnership.name}
                        </Button>
                        </a>
                    </PartnershipItem>
                    ))
                }
            </PartnershipContainer>
        </div>
    )
}

export default Partnership