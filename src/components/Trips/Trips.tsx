import Trip from "./Trip";
import TripProvider from "./Trip-context/Trip-context";

import TripHeader from "./Trip-header";

const Trips = () => {
    return (
        <TripProvider tripid={0}>
            <TripHeader />
            <Trip />
        </TripProvider>
    );
};

export default Trips;
