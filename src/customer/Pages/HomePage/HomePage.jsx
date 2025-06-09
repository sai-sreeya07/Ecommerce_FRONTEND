import React from 'react'
import MainCarosel from '../../components/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'
import { mens_kurta } from '../../../Data/MensKurta'
import Footer from '../../components/footer/Footer'
import HomeSectionCarosel2 from '../../components/HomeSectionCarosel/HomeSectionCarosel2'
import HomeSectionCarosel3 from '../../components/HomeSectionCarosel/HomeSectionCarosel3'
import HomeSectionCarosel4 from '../../components/HomeSectionCarosel/HomeSectionCarosel4'
import HomeSectionCarosel5 from '../../components/HomeSectionCarosel/HomeSectionCarosel5'

function HomePage() {
  return (
    <div className='pt-6'>
        <MainCarosel className="mt-15"/>
        <div className='space-y-15 py-20 flex flex-col justify-center px-10 lg:px-10'>
        {/* <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Shirts"}/>
        <HomeSectionCarosel2 data={mens_kurta} sectionName={"Men's Kurtas"}/>
        <HomeSectionCarosel3 data={mens_kurta} sectionName={"Men's Shoes"}/>
        <HomeSectionCarosel4 data={mens_kurta} sectionName={"women's Saree"}/>
        <HomeSectionCarosel5 data={mens_kurta} sectionName={"Women's Dress"}/> */}
        </div>
    </div>
  )
}

export default HomePage