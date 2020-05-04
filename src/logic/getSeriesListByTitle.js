import TitleInfo from "../classes/titleInfo";

export default async function getSeriesListByTitle(title) {
  var titleWithoutSpaces = title.replace(/\s/g, "_");
  const url = "http://localhost:9000/titleList/" + titleWithoutSpaces;
  const response = await fetch(url);
  const data = await response.json();
  var listSeries = [];

  for (let i = 0; i < data.length; i++) {
    var series = new TitleInfo(
      data[i].idImdb,
      data[i].title,
      data[i].years,
      data[i].imageLink
    );

    listSeries.push(series);
    //console.log(series);
  }

  return listSeries;
}
