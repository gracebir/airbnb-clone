import Header from "../components/Header"
import Footer from '../components/Footer';
import { useRouter } from "next/dist/client/router";
import { format } from 'date-fns';
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({searchResults}) {
    const router = useRouter();

    const { location, endDate, numberGuests, startDate} = router.query;

    const formattedStarted = format(new Date(startDate), "dd MMM yy");
    const formattedEnded = format(new Date(endDate), "dd MMM yy");
    const range = `${formattedStarted} - ${formattedEnded}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numberGuests}`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {numberGuests} number of guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-5">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex space-x-3 mb-4 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Rooms and bed</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults?.map((result,i)=>(
                            <InfoCard
                            key={i}
                            title={result.title}
                            description={result.description}
                            img={result.img}
                            price={result.price}
                            star={result.star}
                            location={result.location}
                            total={result.total}
                            />
                        ))}
                    </div>
                    
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px] mb-4">
                    <Map searchResults={searchResults}/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search;

export async function getServerSideProps(){
    const searchResults = await fetch("https://links.papareact.com/isz")
    .then((res) => res.json());
    return {
        props:{
            searchResults
        }
    }
}
