import type { Route } from './+types/country';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Country' },
    { name: 'description', content: 'Welcome to Country page!' },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const countryName = params.countryName;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await res.json();
  return data;
}

export default function Country({ loaderData }: Route.ComponentProps) {
  const country = {
    name: loaderData[0]?.name?.common || 'N/A',
    officialName: loaderData[0].name?.official || 'N/A',
    region: loaderData[0]?.region || 'N/A',
    subregion: loaderData[0]?.subregion || 'N/A',
    capital: loaderData[0]?.capital || 'N/A',
    population: loaderData[0]?.population || 'N/A',
    flagUrl: loaderData[0]?.flags?.svg || '',
  };
  return (
    <div>
      <h1>Country page</h1>
      <ul>
        <li>Country name: {country.name}</li>
        <li>Country officialName: {country.officialName}</li>
        <li>Country region: {country.region}</li>
        <li>Country subregion: {country.subregion}</li>
        <li>Country capital: {country.capital}</li>
        <li>Country population: {country.population.toLocaleString()}</li>
      </ul>
      <div>
        {country.flagUrl && <img src={country.flagUrl} alt={country.name} />}
      </div>
    </div>
  );
}
