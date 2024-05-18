export const DUMMY_GEO_LOCS: GeographicLocation[] = [
    {
        geographicLocationId: "1",
        geographicLocationLat: "47.299723843258185",
        geographicLocationLong: "-123.17403244585927",
        geographicLocationName: "Washington Corrections Center",
    },
    {
        geographicLocationId: "2",
        geographicLocationLat: "46.73098767622705",
        geographicLocationLong: "-117.16580759999998",
        geographicLocationName: "Evergreen Newsroom, Murrow Center",
    },
    {
        geographicLocationId: "3",
        geographicLocationLat: "46.345958963317436",
        geographicLocationLong: "-120.19008248921602",
        geographicLocationName: "La Escuelita, Granger, WA",
    }
]

type GeographicLocation = {
    geographicLocationId: string
    geographicLocationLat: string
    geographicLocationLong: string
    geographicLocationName: string
}

export default GeographicLocation;