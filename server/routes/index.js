import readCsvs from "../../lib/csv/read-full-csv";
import Promise from "bluebird";
import getTrainUpdates from "../../lib/mta/get-feed";
import filterFeed from "../../lib/mta/filter-feed";
import path from "path";

export default async () => {
  try {
    const [stops, feed] = await Promise.all([
      readCsvs({
        filename: path.join(
          __dirname,
          "..",
          "..",
          "lib",
          "mta",
          "data",
          "stops.txt"
        )
      }),
      getTrainUpdates()
    ]);

    const filteredFeed = await filterFeed({ feed });
    return filteredFeed.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (b.id > a.id) return -1;
      return new Date(a.expected_arrival) - new Date(b.expected_arrival);
    });
  } catch (err) {
    console.log(err);
  }
};
