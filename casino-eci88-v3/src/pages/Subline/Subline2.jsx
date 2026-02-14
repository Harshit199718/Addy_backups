import React, { useMemo } from 'react'
import { SocialsContainer, SocialsListItem } from '../ContactUs/ContactUs.styled'
import { useGetNewsFeedsQuery, useGetSocialsQuery } from '../../api/hooks';
import Marquee from '../../components/common/Marquee/Marquee';
import Image from '../../components/common/Image';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function Subline2() {
  const {data: socials} = useGetSocialsQuery();
  const {data: newsFeeds} = useGetNewsFeedsQuery();
  const {sub_line_fix} = useSelector(selectConfigData);
  
  return (
    <div>
        {
            !sub_line_fix && newsFeeds?.length?
            <Marquee text={newsFeeds.map(feed=>({id: feed.id, text: feed.text}))} />
            :null
        }
        {
            socials?.map(social=>(
            <a key={social?.id} href={social.action_link} target='_blank' style={{textDecoration: "none"}}>
                <SocialsListItem>
                    <div className='socials-list-icon'>
                        <Image key={social.id} src={social.image} alt={social.name} height="150px" width="150px" skeletonHeight="150px" />
                    </div>
                    <div className='socials-list-content'>
                        <div className='socials-list-content-title'>
                            {social?.name}
                        </div>
                        <div className='socials-list-content-description'>
                            {social?.description}
                        </div>
                    </div>
                </SocialsListItem>
            </a>

            ))
        }
    </div>
  )
}

export default Subline2