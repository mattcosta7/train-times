import { MY_STATIONS } from "../../constants/Mta";
import Promise from "bluebird";

export default async ({ feed }) =>
  Promise.reduce(
    feed,
    (acc, trip) => {
      const stus = trip.trip_update.stop_time_update.filter(
        stu => MY_STATIONS[stu.stop_id]
      );
      if (stus.length && !trip.is_deleted) {
        const stop = stus.map(stu => ({
          id: stu.stop_id,
          line: trip.trip_update.trip.route_id,
          name: MY_STATIONS[stu.stop_id],
          expected_arrival: new Date(stu.arrival.time * 1000),
          alert: trip.alert
        }));
        return acc.concat(stop);
      }
      return acc;
    },
    []
  );
