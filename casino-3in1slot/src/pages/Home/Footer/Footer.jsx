import React from 'react'
import { CategoriesAndSupport, FooterContainer, MenuContainer, MenuItemContainer } from './Footer.styled'
import { ButtonWrapper } from '../Header/Header.styled'

function Footer() {
  return (
    <FooterContainer>
        <MenuContainer>
            <MenuItemContainer>
                <ButtonWrapper className='menu-btn'>
                    <span>
                        Menu
                    </span>
                </ButtonWrapper>
            </MenuItemContainer>
            <MenuItemContainer>
                <img src="http://localhost:3000/static/media/ctc_promo.f098f0e6ba23a06e4366.png" alt="" />
                <span>Bonus</span>
            </MenuItemContainer>
            <MenuItemContainer>
                <img src="http://localhost:3000/static/media/money-bag.28e78c041a93d7407789.png" alt="" />
                <span>Top Winnings</span>
            </MenuItemContainer>
        </MenuContainer>
        <CategoriesAndSupport>
            <div className="support">
                <img src="http://localhost:3000/static/media/lobbylivechat.7d4f27c48ad8f4dcd0db.jpg" alt="" />
                <img src="http://localhost:3000/static/media/lucky-wheel-icon.95ae82316175402810d4.gif" alt="" />
            </div>
            <div className="games-categories">
                <div className="categories">
                    <button className="category">
                        <img src="http://localhost:3000/static/media/casino.2e380094698d9049ee46.png" alt="" />
                        Live
                    </button>
                    <button className="category active">
                        <img src="http://localhost:3000/static/media/slot.3964432fe159e99c3533.png" alt="" />
                        Slots
                    </button>
                </div>
            </div>
        </CategoriesAndSupport>
    </FooterContainer>
  )
}

export default Footer