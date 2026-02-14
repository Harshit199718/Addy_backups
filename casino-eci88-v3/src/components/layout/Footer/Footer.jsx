import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FooterContainer, FooterItem } from './Footer.styled';
import Image from '../../common/Image';
import { useTranslation } from 'react-i18next';
import useFooterMenu from './useFooterMenu';
import { useSelector } from 'react-redux';
import { selectUnreadCount } from '../../../app/slices/general';

function Footer() {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const items = useFooterMenu();
    const unreadCount = useSelector(selectUnreadCount);
    useEffect(() => {
        const backgroundLazyLoad = () => {
            const lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
          
            if ("IntersectionObserver" in window) {
              let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                  }
                });
              });
          
              lazyBackgrounds.forEach(function(lazyBackground) {
                lazyBackgroundObserver.observe(lazyBackground);
              });
            }
        }

        if (document.readyState === 'complete') {
            backgroundLazyLoad();
        } else {
            window.addEventListener("load", backgroundLazyLoad);
        }

        return () => window.removeEventListener("load", backgroundLazyLoad);
    }, [])
  return (
    <FooterContainer className='lazy-background'>
        {
            items.map(item=>{
              return (
                <FooterItem key={item.path} $active={location.pathname === `${item.path.includes("/")?item.path:`/${item.path}`}`} onClick={()=> navigate(item.path)}>
                    <Image src={item.image} alt=""  height="30px" skeletonWidth="30px" skeletonHeight="30px" circle />
                    {
                        item.isText?
                        <h3 className="item-text">{item.text}</h3>
                        :<Image className="item-text-img" src={item.text} height="25px" width="auto" skeletonHeight={25} />
                    }
                    {
                      item.path === "contactus" && unreadCount?
                      <div className="unread-count">{unreadCount}</div>
                      :null
                    }
                </FooterItem>
            )})
        }
    </FooterContainer>
  )
}

export default React.memo(Footer)