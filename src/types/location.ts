export interface CountryDto {
  CountryId: number;
  name: string;
  code: string;
}

export interface StateDto {
  StateId: number;
  name: string;
  code: string;
  countryName: string;
}

export interface CityDto {
  CityId: number;
  name: string;
  code: string;
  countryName: string;
}
