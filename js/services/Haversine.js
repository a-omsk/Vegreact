const { PI, sin, asin, cos, sqrt } = Math;

const HaversineFormula = (...args) => {
    const earthRadius = 6372.8; // km
    const radians = args.map(deg => deg / 180.0 * PI);
    const [lat1, lon1, lat2, lon2] = radians;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = sin(dLat / 2) * sin(dLat / 2) + sin(dLon / 2) * sin(dLon / 2) * cos(lat1) * cos(lat2);
    const c = 2 * asin(sqrt(a));

    return earthRadius * c;
};

export default HaversineFormula;
