import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData, cardData}) {
  return (
    <div>
      <Head>
        <title>airbnb clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Banner/>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nearby</h2>
          {/* pull from the server  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {exploreData?.map((item,i)=>(
              <SmallCard
              key={i}
              img={item.img}
              location={item.location}
              distance={item.distance}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 mf-3">
            {cardData?.map((card,i)=>(
              <MediumCard 
              key={i}
              img={card.img}
              title={card.title}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp')
  .then((res)=> res.json());

  const cardData = await fetch('https://links.papareact.com/zp1')
  .then((res)=> res.json());
  return {
    props:{
      exploreData,
      cardData
    }
  }
}
