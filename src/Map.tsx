import React from 'react';
import type * as maplibregl from 'maplibre-gl';

declare global {
  interface Window {
    geolonia: any;
  }
}


interface Props {
  className: string;
  setMap: React.Dispatch<React.SetStateAction<maplibregl.Map | undefined>>;
}

const Component = (props: Props) => {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const { setMap } = props;

  React.useEffect(() => {
    const map: maplibregl.Map = new window.geolonia.Map({
      container: mapContainer.current,
      style: "geolonia/gsi",
      hash: true,
      center: [ 134.0403, 34.334 ],
      zoom: 9.2,
    });

    map.on("load", () => {
      setMap(map);
    });

    return () => {
      map.remove();
    };
  }, [mapContainer, setMap]);

  return (
    <>
      <div
        className={props.className}
        ref={mapContainer}
        data-lang="ja"
        data-navigation-control="on"
        data-gesture-handling="off"
      ></div>
    </>
  );
}

export default Component;
