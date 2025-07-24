import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletterbox from '../components/Newsletterbox'

const home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <Newsletterbox/>
    </div>
  )
}

export default home