// src/lib/datocms.ts

// Ta funkcja odpowiada za komunikację z serwerami DatoCMS
export async function fetchDatoCMS(query: string, variables = {}) {
  // Wysyłamy prośbę pod specjalny adres GraphQL od DatoCMS
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Tutaj Astro automatycznie wyciąga Twój tajny klucz z pliku .env
      'Authorization': `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  
  // Jeśli wpisaliśmy coś źle, terminal wyrzuci nam jasny błąd
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Błąd podczas pobierania danych z DatoCMS');
  }
  
  // Zwracamy czyste dane z bazy
  return json.data;
}