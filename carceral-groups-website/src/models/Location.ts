export type Location = {
    latlngStr: string;
    label: string;
}

// TODO: Refactor into a service api call
export const MARKERLOCATIONS: Location[] = [
    { latlngStr: '47.299723843258185, -123.17403244585927', label: 'Washington Corrections Center' },
    { latlngStr: '46.92520017548775, -123.92100101336285', label: 'Stafford Creek Corrections Center' },
    { latlngStr: '46.07812903003074, -118.35677764875055', label: 'Washington State Penitentiary' },
    { latlngStr: '46.73098767622705, -117.16580759999998', label: 'Evergreen Newsroom, Murrow Center' },
    { latlngStr: '47.19686490207005, -122.6579449486688', label: 'McNeil Island Corrections Center' },
    { latlngStr: '47.61945939065681, -122.359439800832', label: 'Seattle Post Intelligencer building' },
    { latlngStr: '47.601990221257424, -122.33189048910353', label: 'Smith Tower, ACLU of Washington state office' },
    { latlngStr: '46.345958963317436, -120.19008248921602', label: 'La Escuelita, Granger, WA' },
    { latlngStr: '47.65479243631465, -122.30745790445988', label: 'University of Washington' },
    { latlngStr: '47.60334696496473, -122.30660900064738', label: 'Black Panthers Party Headquarters (second location)' },
    { latlngStr: '47.61945939065681, -122.359439800832', label: 'Seattle Post Intelligencer building' },
    { latlngStr: '47.65835361274492, -122.30385550858871', label: 'McMahon Hall, University of Washington' },
    { latlngStr: '47.246334710589394, -122.45096066974075', label: 'Tacoma Urban League' },
    { latlngStr: '47.84570689182511, -122.00011294155688', label: 'Monroe Correctional Complex' },
]

// TODO: Refactor into a service api call
export const GetLocationLabel = (latlngStr: string): string => {
    const location = MARKERLOCATIONS.find((marker) => marker.latlngStr === latlngStr);
    return location ? location.label : latlngStr;
}