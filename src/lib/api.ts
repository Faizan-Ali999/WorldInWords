import { SpecializedData, countrySpecializedData, getFallbackSpecializedData } from '@/data/specializedData';

export interface CountryDetails {
  name: string;
  officialName: string;
  code3: string;
  flagUrl: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: string[];
  currencies: { name: string; symbol: string }[];
  latlng: [number, number];
  weather?: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    iconName: string;
  };
  gdpNominal?: number;
  gdpGrowth5Years: { year: number; gdpNominal: number; gdpGrowthRate: number }[];
  populationGrowth5Years: { year: number; population: number }[];
  specialized: SpecializedData;
}

// Map WMO weather code to text and a Lucide icon identifier
function mapWeatherCode(code: number): { condition: string; iconName: string } {
  if (code === 0) return { condition: "Clear Sky", iconName: "Sun" };
  if (code >= 1 && code <= 3) return { condition: "Partly Cloudy", iconName: "CloudSun" };
  if (code === 45 || code === 48) return { condition: "Foggy", iconName: "CloudFog" };
  if (code >= 51 && code <= 55) return { condition: "Drizzle", iconName: "CloudDrizzle" };
  if (code >= 56 && code <= 57) return { condition: "Freezing Drizzle", iconName: "CloudSnow" };
  if (code >= 61 && code <= 65) return { condition: "Rainy", iconName: "CloudRain" };
  if (code >= 66 && code <= 67) return { condition: "Freezing Rain", iconName: "CloudSnow" };
  if (code >= 71 && code <= 75) return { condition: "Snowing", iconName: "CloudSnow" };
  if (code === 77) return { condition: "Snow Grains", iconName: "CloudSnow" };
  if (code >= 80 && code <= 82) return { condition: "Rain Showers", iconName: "CloudRain" };
  if (code >= 85 && code <= 86) return { condition: "Snow Showers", iconName: "CloudSnow" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", iconName: "CloudLightning" };
  return { condition: "Overcast", iconName: "Cloud" };
}

export async function fetchCountryDetailsFromServer(code3: string): Promise<CountryDetails> {
  // 1. Fetch from REST Countries v5
  //
  // v5 exact response shape (from official docs sample):
  // {
  //   data: {
  //     objects: [{
  //       names:       { common, official, native: { ... } }
  //       codes:       { alpha_2, alpha_3, ... }
  //       capitals:    [{ name, primary, coordinates: { lat, lng } }]
  //       flag:        { emoji, url_svg, url_png }
  //       region:      string
  //       subregion:   string
  //       area:        { kilometers, miles }          ← object, NOT a number
  //       population:  number                         ← top-level, NOT under demographics
  //       currencies:  [{ code, name, symbol }]       ← array
  //       languages:   [{ name, bcp47, ... }]         ← array
  //     }]
  //   }
  // }
  //
  // Note: there is NO top-level latlng in v5.
  // Coordinates come from capitals[0].coordinates.{ lat, lng }

  let restData: any = null;
  try {
    const restApiKey = process.env.NEXT_PUBLIC_REST_COUNTRIES_KEY;

    const res = await fetch(`https://api.restcountries.com/countries/v5/code?q=${code3}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${restApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const json = await res.json();
      // v5 wraps results under data.objects array
      const objects = json?.data?.objects;
      restData = Array.isArray(objects) && objects.length > 0 ? objects[0] : null;
    } else {
      console.error(`REST Countries API Error: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching REST Countries:", error);
  }

  // --- Map v5 fields to our internal shape ---

  const fallbackName = code3;
  const name        = restData?.names?.common   || fallbackName;
  const officialName = restData?.names?.official || name;

  // capitals is an array of { name, primary, coordinates: { lat, lng } }
  const primaryCapital = restData?.capitals?.[0];
  const capital        = primaryCapital?.name || "Capital City";

  // Coordinates come from the capital's coordinates object, not a top-level latlng
  const capCoords = primaryCapital?.coordinates;
  const latlng: [number, number] =
    capCoords?.lat != null && capCoords?.lng != null
      ? [capCoords.lat, capCoords.lng]
      : [0, 0];

  // flag.url_png is the correct field in v5
  const flagUrl =
    restData?.flag?.url_png ||
    restData?.flag?.url_svg ||
    `https://flagcdn.com/w320/${code3.toLowerCase()}.png`;

  const region    = restData?.region    || "Unknown Region";
  const subregion = restData?.subregion || "Unknown Subregion";

  // population is a top-level number in v5
  const population = typeof restData?.population === 'number' ? restData.population : 0;

  // area in v5 is an object: { kilometers, miles }
  const area = restData?.area?.kilometers ?? 0;

  // languages is an array of objects with a .name property
  const languages: string[] = restData?.languages
    ? (restData.languages as any[]).map((l: any) => l.name).filter(Boolean)
    : ["English"];

  // currencies is an array of { code, name, symbol }
  const currencies = restData?.currencies
    ? (restData.currencies as any[]).map((curr: any) => ({
        name:   curr.name   || "Local Currency",
        symbol: curr.symbol || "$"
      }))
    : [{ name: "Local Currency", symbol: "$" }];

  // 2. Fetch Live Weather from Open-Meteo using capital coordinates
  let weather: CountryDetails['weather'] = undefined;
  if (latlng[0] !== 0 || latlng[1] !== 0) {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
      );
      if (weatherRes.ok) {
        const wData = await weatherRes.json();
        const current = wData.current;
        const mapped = mapWeatherCode(current.weather_code);
        weather = {
          temp:      Math.round(current.temperature_2m),
          condition: mapped.condition,
          humidity:  current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          iconName:  mapped.iconName
        };
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  // 3. Fetch World Bank GDP Data
  let gdpNominal: number | undefined = undefined;
  let worldBankGdpGrowth: CountryDetails['gdpGrowth5Years'] | null = null;
  try {
    const wbRes = await fetch(
      `https://api.worldbank.org/v2/country/${code3}/indicator/NY.GDP.MKTP.CD?date=2019:2023&format=json`
    );
    if (wbRes.ok) {
      const wbData = await wbRes.json();
      if (wbData && wbData[1] && Array.isArray(wbData[1])) {
        const records = wbData[1].filter((r: any) => r.value !== null);
        if (records.length > 0) {
          records.sort((a: any, b: any) => parseInt(a.date) - parseInt(b.date));
          gdpNominal = Math.round(records[records.length - 1].value / 1e9);

          worldBankGdpGrowth = records.map((record: any, index: number) => {
            const valBillions = record.value / 1e9;
            let growthRate = 2.5;
            if (index > 0 && records[index - 1].value) {
              growthRate = parseFloat(
                (((record.value - records[index - 1].value) / records[index - 1].value) * 100).toFixed(2)
              );
            }
            return {
              year:          parseInt(record.date),
              gdpNominal:    Math.round(valBillions),
              gdpGrowthRate: growthRate
            };
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching World Bank GDP:", error);
  }

  const specData = countrySpecializedData[code3] || getFallbackSpecializedData(code3, name);

  const populationGrowth5Years = specData.populationGrowth5Years.map((p) => {
    const ratio = population > 0
      ? population / specData.populationGrowth5Years[specData.populationGrowth5Years.length - 1].population
      : 1;
    return { year: p.year, population: Math.round(p.population * ratio) };
  });

  return {
    name,
    officialName,
    code3,
    flagUrl,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    latlng,
    weather,
    gdpNominal: gdpNominal || specData.gdpGrowth5Years[specData.gdpGrowth5Years.length - 1].gdpNominal,
    gdpGrowth5Years:        worldBankGdpGrowth || specData.gdpGrowth5Years,
    populationGrowth5Years,
    specialized: specData
  };
}

export async function fetchCountryDetails(code3: string): Promise<CountryDetails> {
  try {
    const res = await fetch(`/api/country?code=${code3}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Error fetching country details from API Route:", error);
  }

  // Offline fallback
  const specData = countrySpecializedData[code3] || getFallbackSpecializedData(code3, code3);
  return {
    name:           code3,
    officialName:   code3,
    code3,
    flagUrl:        `https://flagcdn.com/w320/${code3.toLowerCase()}.png`,
    capital:        "Capital City",
    region:         "Unknown Region",
    subregion:      "Unknown Subregion",
    population:     0,
    area:           0,
    languages:      ["English"],
    currencies:     [{ name: "Local Currency", symbol: "$" }],
    latlng:         [0, 0],
    gdpNominal:     specData.gdpGrowth5Years[specData.gdpGrowth5Years.length - 1].gdpNominal,
    gdpGrowth5Years:        specData.gdpGrowth5Years,
    populationGrowth5Years: specData.populationGrowth5Years,
    specialized:    specData
  };
}
