export type FetchWeatherInput = {
  city: string;
  state: string;
  zipCode: string; 
};

export type FetchWeatherResult = {
  lat: number;
  long: number;
  current: unknown;
};

function buildQuery({ city, state, zipCode }: FetchWeatherInput): string {
  return encodeURIComponent(`${city}, ${state} ${zipCode}`);
}

export async function fetchCurrentWeather(
  input: FetchWeatherInput,
  abortSignal?: AbortSignal
): Promise<FetchWeatherResult> {
  const key = process.env.WEATHERSTACK_KEY;
  if (!key) {
    throw new Error("Missing WEATHERSTACK_KEY in environment");
  }

  const query = buildQuery(input);
  const url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: abortSignal ?? controller.signal });
    if (!res.ok) {
      throw new Error(`Weatherstack HTTP ${res.status}`);
    }
    const data = (await res.json()) as any;

    const lat = Number(data?.location?.lat);
    const long = Number(data?.location?.lon ?? data?.location?.lng);
    const current = data?.current;

    if (!Number.isFinite(lat) || !Number.isFinite(long) || current == null) {
      throw new Error("Invalid Weatherstack payload: missing lat/long/current");
    }

    return { lat, long, current };
  } catch (err) {
    if ((err as any)?.name === "AbortError") {
      throw new Error("Weatherstack request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
