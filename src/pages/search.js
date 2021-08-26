import Header from "../components/Header"
import Footer from '../components/Footer';
import { useRouter } from "next/dist/client/router";
import { format } from 'date-fns';

function Search() {
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
                    <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Rooms and bed</p>
                        <p className="button">More filters</p>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search
