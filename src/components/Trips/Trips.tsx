import Trip from "./Trip";
import TripProvider from "./Trip-context/Trip-context";

const Trips = () => {
    return (
        <TripProvider>
            <Trip />
        </TripProvider>
    );
};

export default Trips;
