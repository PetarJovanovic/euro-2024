const BASE_URL = process.env.BASE_URL;

export async function GET(request) {
  const group = request.nextUrl.searchParams.get('group') ?? '';

  const res = await fetch(`${BASE_URL}${process.env[group]}/matches/`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return Response.json(data, { status: 200 });
}
