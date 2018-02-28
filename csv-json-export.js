const json2csv = require("json2csv").parse;

exports.csvJsonReport = functions.https.onRequest((request, response) => {

  // You should you how to prepare an object
  // It could be anything that you like from your collections for example.
  var report = {'a': 0, 'b': 1};

  // Return JSON to screen
  response.status(200).json(report);

  // If you want to download a CSV file, you need to convert the object to CSV format
  // Please read this for other usages of json2csv - https://github.com/zemirco/json2csv
  const csv = json2csv(report)
  response.setHeader(
    "Content-disposition",
    "attachment; filename=report.csv"
  )
  response.set("Content-Type", "text/csv")
  response.status(200).send(csv)

})
