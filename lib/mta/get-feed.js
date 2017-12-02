import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import request from "request";
import Promise from "bluebird";

const requestSettings = {
  method: "GET",
  url: `http://datamine.mta.info/mta_esi.php?key=${process.env.MTA_API_KEY}&feed_id=16`,
  encoding: null
};

export default async () =>
  new Promise((resolve, reject) => {
    request(requestSettings, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        try {
          const { entity } = GtfsRealtimeBindings.FeedMessage.decode(body);
          return resolve(entity.filter(trip => trip.trip_update));
        } catch (err) {
          console.log(err);
          console.log(response);
          return reject(error);
        }
      }
      return reject(error);
    });
  });
