import moment from 'moment';

export default function formatData(data) {
  const groups = Object.keys(data);

  //Filters out relevant data from the API for all groups into single array of matches.
  const matches = groups
    .map(group => {
      const groupMatches = data[group].map(match => {
        let matchStatus;

        if (match.matchStatusId === 1) {
          matchStatus = 'Finished';
        } else if (match.matchStatusId === 2) {
          matchStatus = 'Upcoming';
        } else if (match.matchStatusId === 7) {
          matchStatus = 'Ongoing';
        } else if (match.matchStatusId === 8) {
          matchStatus = 'First half';
        } else if (match.matchStatusId === 9) {
          matchStatus = 'Half time';
        } else if (match.matchStatusId === 10) {
          matchStatus = 'Second half';
        }

        const live = match.matchStatusId === 7 || match.matchStatusId === 8 || match.matchStatusId === 9 || match.matchStatusId === 10 ? true : false;

        return {
          timestamp: match.timestamp,
          matchStatus,
          live,
          name: match.name,
          result: match.result,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          stadium: match.stadium.name,
          group,
        };
      });

      return groupMatches;
    })
    .flat(Infinity);

  // Filter out unique dates for all matches
  const allMatches = filterMatches(matches, ['Upcoming', 'Finished', 'Ongoing', 'First half', 'Half time', 'Second half'], 'desc');

  // Filter out unique dates for live matches.
  const liveMatches = filterMatches(matches, ['Ongoing', 'First half', 'Half time', 'Second half'], 'asc');

  // Filter out unique dates for upcoming matches
  const upcomingMatches = filterMatches(matches, ['Upcoming'], 'asc');

  // Filter out unique dates for finished matches
  const finisehdMatches = filterMatches(matches, ['Finished'], 'desc');

  return { liveMatches, upcomingMatches, finisehdMatches, allMatches };
}

function filterMatches(matches, filters, sortOption) {
  // Filter out matches based on match status.
  const filteredMatches = matches.filter(match => {
    return filters.includes(match.matchStatus);
  });

  // Sort matches ascending and get all the dates. Sorting for matches within same date.
  const sortedFilteredMatches = filteredMatches.sort((a, b) => moment(a.timestamp) - moment(b.timestamp));
  const allDates = sortedFilteredMatches.map(match => moment(match.timestamp).format('LL'));

  // Get unique dates and sort ascending or descending.
  let uniqueDates;
  if (sortOption === 'asc') {
    uniqueDates = Array.from(new Set(allDates)).sort();
  } else if (sortOption === 'desc') {
    uniqueDates = Array.from(new Set(allDates)).sort().reverse();
  }

  // Group all matches on same date.
  const matchesOnSameDate = uniqueDates.map(date => {
    return sortedFilteredMatches.filter(match => {
      return moment(match.timestamp).format('LL') === date;
    });
  });

  return matchesOnSameDate;
}
