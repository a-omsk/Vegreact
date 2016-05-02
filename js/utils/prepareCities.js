const coordsRegExp = /\d+.\d+/g;

export default ({ centroid, code, name, zoomlevel, min_zoomlevel }) => {
    const [lng, lat] = centroid.match(coordsRegExp);

    return {
        code,
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: parseInt(zoomlevel, 10),
        minZoom: parseInt(min_zoomlevel, 10)
    };
};