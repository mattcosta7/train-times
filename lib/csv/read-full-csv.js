import csv from "csvtojson";

export default ({ filename }) =>
  new Promise((resolve, reject) => {
    const data = [];
    csv()
      .fromFile(filename)
      .on("json", jsonObj => {
        data.push(jsonObj);
      })
      .on("done", error => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
  });
