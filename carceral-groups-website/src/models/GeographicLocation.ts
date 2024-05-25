export const DUMMY_GEO_LOCS: GeographicLocation[] = [
    {
        GeographicLocationId: "1",
        Latitude: "47.299723843258185",
        Longitude: "-123.17403244585927",
        GeographicLocationName: "Washington Corrections Center",
    },
    {
        GeographicLocationId: "2",
        Latitude: "46.73098767622705",
        Longitude: "-117.16580759999998",
        GeographicLocationName: "Evergreen Newsroom, Murrow Center",
    },
    {
        GeographicLocationId: "3",
        Latitude: "46.345958963317436",
        Longitude: "-120.19008248921602",
        GeographicLocationName: "La Escuelita, Granger, WA",
    }
]

type GeographicLocation = {
    GeographicLocationId: string
    GeographicLocationName: string
    Latitude: string
    Longitude: string
}

export default GeographicLocation;