export default async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = 'An error occurred while fetching the data.';
    let errorName = res.statusText;

    try {
      // Attempt to parse the error response as JSON
      const errorData = await res.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (jsonError) {
      // If unable to parse JSON, use the default error message
      console.error('JSON parsing error:', jsonError);
    }

    const error = new Error(errorMessage);
    error.name = errorName;
    throw error;
  }

  // If response is OK, parse and return data
  return await res.json();
}
