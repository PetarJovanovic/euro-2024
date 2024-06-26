export default function filterMatches(data, searchItem) {
  const { liveMatches, upcomingMatches, finisehdMatches } = data;

  if (searchItem === null) {
    const filteredLiveMatches = liveMatches;
    const filteredUpcomingMatches = upcomingMatches;
    const filteredFinisehdMatches = finisehdMatches;
    return { filteredLiveMatches, filteredUpcomingMatches, filteredFinisehdMatches };
  }

  const filteredLiveMatches = filter(liveMatches, searchItem);
  const filteredUpcomingMatches = filter(upcomingMatches, searchItem);
  const filteredFinisehdMatches = filter(finisehdMatches, searchItem);

  return { filteredLiveMatches, filteredUpcomingMatches, filteredFinisehdMatches };
}

function filter(matches, searchItem) {
  const filteredMatches = matches.map(date => {
    return date.filter(match => {
      const teams = match.name.split(' - ');
      const regex = new RegExp(`^${searchItem}`, 'i');
      return teams.some(rx => regex.test(rx));
    });
  });

  return filteredMatches.filter(date => date.length > 0);
}
