import React from 'react'
import { GameFilters, FooterWrapper, GamesContainer, HeaderWrapper, HomeContent, HomeLayout } from './Home.styled'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function Home() {
  const games = [
    "https://staging-uat-api.eci88.com/media/None_1LaEtPk",
    "https://staging-uat-api.eci88.com/media/None_wfgqjGw",
    "https://staging-uat-api.eci88.com/media/None_55PotQg",
    "https://staging-uat-api.eci88.com/media/CANDY888%20(2).png",
    "https://staging-uat-api.eci88.com/media/None_1LaEtPk",
    "https://staging-uat-api.eci88.com/media/None_wfgqjGw",
    "https://staging-uat-api.eci88.com/media/None_55PotQg",
    "https://staging-uat-api.eci88.com/media/CANDY888%20(2).png",
    "https://staging-uat-api.eci88.com/media/None_1LaEtPk",
    "https://staging-uat-api.eci88.com/media/None_wfgqjGw",
    "https://staging-uat-api.eci88.com/media/None_55PotQg",
    "https://staging-uat-api.eci88.com/media/CANDY888%20(2).png",
    "https://staging-uat-api.eci88.com/media/None_1LaEtPk",
    "https://staging-uat-api.eci88.com/media/None_wfgqjGw",
    "https://staging-uat-api.eci88.com/media/None_55PotQg",
    "https://staging-uat-api.eci88.com/media/CANDY888%20(2).png",
  ]
  return (
    <HomeLayout>
      <HeaderWrapper>
        {/* <img className='checkin-image' src="http://localhost:3000/static/media/daily-check-in.8f8ab1b35c3731b7dacc.gif" alt="" /> */}
        <Header />
      </HeaderWrapper>
      <HomeContent>
        <GameFilters>
          <button className="filter">Web</button>
          <button className="filter">App</button>
          <button className="filter">All</button>
        </GameFilters>
        <GamesContainer>
          {
            games.map(game => (
              <img src={game} />
            ))
          }
        </GamesContainer>
      </HomeContent>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </HomeLayout>
  )
}

export default Home