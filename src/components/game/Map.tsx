import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Map as Mapbox, Popup } from "mapbox-gl";
import { Paper } from "@mui/material";

const Map = (props: MapProps) => {
    const mapContainer = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(2.00);
    const [lat, setLat] = useState(40.00);
    const [zoom, setZoom] = useState(1);
    const [timerInterval, setTimerInterval] = useState<any>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new Mapbox({
            container: mapContainer.current || "",
            style: 'mapbox://styles/dorit75/clak5c76z005914o64jbe3you?optimize=true',
            center: [lng, lat],
            zoom,
            accessToken: "pk.eyJ1IjoiZG9yaXQ3NSIsImEiOiJjbGFqdjU1bzYwZzBhM3NvMGJ0Z2M1a3F2In0.RddpBuye5jg57iGg25DQTA",
        });

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
                const { place_name_fr, properties } = data.features[0];
                new Popup()
                    .setLngLat(e.lngLat.wrap())
                    .setHTML(`<b>Votre choix :</b><br />${place_name_fr}`)
                    .addTo(map.current);

                props.setSelectedCountry({
                    name: place_name_fr,
                    code: properties.short_code.toUpperCase(),
                });
                props.setCanValidate(true);
            });
        });

        map.current.on('load', () => {
            props.onLoad && props.onLoad();

            // Démarrage du chrono
            setTimerInterval(setInterval(() => props.setTimer(timer => timer + 1), 1000));
        });
    }, []);

    useEffect(() => {
        // Arrêt du chrono
        setTimerInterval((timerInterval: any) => {
            clearInterval(timerInterval);
            return null
        });
    }, [props.winnerDialogVisible]);

  return (
    <div style={{ position: "relative", width: "70vw", height: "90vh" }}>
        { props.selectedCountry && props.selectedCountry.name && (
            <Paper sx={{ p: 2, zIndex: 1, position: "absolute", bottom: 0, right: 0, margin: "0 24px 36px 0" }}>
                Pays sélectionné : {props.selectedCountry.name}
            </Paper>
        )}
        <div ref={mapContainer} style={{ width: "100%", height: "90vh" }} />
    </div>
  );
}

interface MapProps {
    selectedCountry: { name: string, code: string };
    winnerDialogVisible: boolean;   // pour savoir si la partie est terminée
    setSelectedCountry: Dispatch<SetStateAction<{ name: string, code: string }>>;
    setCanValidate: Dispatch<SetStateAction<boolean>>;
    setTimer: Dispatch<SetStateAction<number>>;
    onLoad?: () => void;
}

export default Map;