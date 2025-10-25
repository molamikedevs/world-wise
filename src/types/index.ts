export interface City {
    id: string;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    }
}

export interface CountriesListProps {
	cities: Array<City>
	isLoading: boolean
}

export interface CountryItemProps {
  country: {
    country: string;
    emoji: string;
  };
}