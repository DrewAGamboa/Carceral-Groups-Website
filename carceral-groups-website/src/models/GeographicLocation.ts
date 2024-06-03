export const DUMMY_GEO_LOCS: GeographicLocation[] = [
    {
        geographicLocationId: "1",
        latitude: "47.299723843258185",
        longitude: "-123.17403244585927",
        geographicLocationName: "Washington Corrections Center",
    },
    {
        geographicLocationId: "2",
        latitude: "46.73098767622705",
        longitude: "-117.16580759999998",
        geographicLocationName: "Evergreen Newsroom, Murrow Center",
    },
    {
        geographicLocationId: "3",
        latitude: "46.345958963317436",
        longitude: "-120.19008248921602",
        geographicLocationName: "La Escuelita, Granger, WA",
    }
]

type GeographicLocation = {
    geographicLocationId: string
    geographicLocationName: string
    latitude: string
    longitude: string
}

export default GeographicLocation;