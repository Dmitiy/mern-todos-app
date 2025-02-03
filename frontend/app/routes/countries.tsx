import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/countries';
import Input from '@/ui/input';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Countries' },
    { name: 'description', content: 'Welcome to Countries page!' },
  ];
}

export async function clientLoader() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  const filteredCountriesData = loaderData.filter((country: any) => {
    const matchesRegion =
      !region || country.region.toLowerCase().includes(region.toLowerCase());
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });
  return (
    <div>
      <h1>Countries details</h1>
      <div>
        <Input
          type='search'
          name='search'
          placeholder='Search for countries...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <select name='regions' onChange={(e) => setRegion(e.target.value)}>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>

      {filteredCountriesData.length === 0 ? (
        <div>No countries found</div>
      ) : (
        <ul>
          {filteredCountriesData.map((country: any) => (
            <li key={country.cca2}>
              <Link
                to={{
                  pathname: `/countries/${country.name.common}`,
                }}>
                {country.name.common}
              </Link>
              <div>
                Region: {country.region} | Population {country.population}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
