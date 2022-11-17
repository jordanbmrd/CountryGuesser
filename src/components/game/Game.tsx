import { useRef, useState, useEffect } from "react";
import { Map, Popup } from "mapbox-gl";
import { Typography } from "@mui/material";
import './Game.styles.css';

const Game = () => {
    const mapContainer = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (map.current) return;

        map.current = new Map({
            container: mapContainer.current || "",
            style: 'mapbox://styles/dorit75/clak5c76z005914o64jbe3you?optimize=true',
            center: [lng, lat],
            zoom,
            accessToken: "pk.eyJ1IjoiZG9yaXQ3NSIsImEiOiJjbGFqdjU1bzYwZzBhM3NvMGJ0Z2M1a3F2In0.RddpBuye5jg57iGg25DQTA",
        });

        //http://api.tiles.mapbox.com/v4/geocode/mapbox.places-country-v1/-73.989,40.733.json?access_token=pk.eyJ1IjoiZG9yaXQ3NSIsImEiOiJjbGFqdjU1bzYwZzBhM3NvMGJ0Z2M1a3F2In0.RddpBuye5jg57iGg25DQTA

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', (e: any) => {
            const { lat, lng } = e.lngLat;
            fetch(`http://api.tiles.mapbox.com/v4/geocode/mapbox.places-country-v1/${lng},${lat}.json?access_token=pk.eyJ1IjoiZG9yaXQ3NSIsImEiOiJjbGFqdjU1bzYwZzBhM3NvMGJ0Z2M1a3F2In0.RddpBuye5jg57iGg25DQTA&language=fr`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                const { place_name_fr } = data.features[0];
                new Popup()
                    .setLngLat(e.lngLat.wrap())
                    .setHTML(place_name_fr)
                    .addTo(map.current);
            });
            
        });

        const interval = setInterval(() => setTimer(timer => timer + 1), 1000);
    }, []);

  return (
    <div>
        <div className="sidebar">
            <Typography fontSize={20}>Temps écoulé : { timer }s</Typography>
        </div>
        <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Game;