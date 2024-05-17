import { Geocoder } from "@geolonia/addresses-geocoder";
import HTTPBackend from "@geolonia/addresses-decoder/source_backends/http";

let geocoder: Geocoder;

export async function geocode(address: string) {
  if (!geocoder) {
    geocoder = new Geocoder(HTTPBackend, "./api/takamatsu.dat");
  }
  const result = await geocoder.geocode(address);
  return result;
}
