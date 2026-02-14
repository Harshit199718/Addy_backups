import React, { useMemo } from 'react'
import { SocialsContainer } from '../ContactUs/ContactUs.styled'
import { useGetNewsFeedsQuery, useGetSocialsQuery } from '../../api/hooks';
import Marquee from '../../components/common/Marquee/Marquee';
import Image from '../../components/common/Image';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function Subline1() {
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
        <SocialsContainer>
            {
                socials?.map(social=>(
                <div>
                    <a key={social?.id} href={social.action_link} target='_blank'><Image key={social.id} src={social.image} alt={social.provider} height="auto" width="100%" skeletonHeight="150px" /></a>
                </div>
                ))
            }
        </SocialsContainer>
    </div>
  )
}

export default Subline1