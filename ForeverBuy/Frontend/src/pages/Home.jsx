import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='w-full flex flex-col gap-[5rem] justify-center'>
      <Hero/>
      <React.Suspense fallback={<div>loading....</div>}>
        <LatestCollections/>
        <BestSellers/>
      </React.Suspense>
      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Home