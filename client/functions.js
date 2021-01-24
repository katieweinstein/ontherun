export function createRunObject(data) {
    // Create a "runs" object that will hold all of our data as key value pairs,
    // the key being the column header (Time, Distance, Laps, etc),
    // and the value being an array that holds all of the data.
    let runs = {};
    const columnInfo = data.split('\n')[0].split(',');

    // Go through the first row and create keys in the runs object
    for (let i = 0; i < columnInfo.length; i++) {
      runs[columnInfo[i].replace(/["]+/g, '')] = [];
    }

    // Split the data into rows, iterate through all rows (except the first),
    // and store each piece of data in its corresponding array.
    const row = data.split('\n')
    for (let i = 1; i < row.length; i++) {

      // This regex splits each row by commas NOT enclosed in quotations
      const column = row[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
      for (let j = 0; j < column.length; j++) {
        const keys = Object.keys(runs);
        runs[keys[j]].push(column[j].replace(/["]+/g, ''));
      }
    }
    return runs;
}

export function paceToDecimal(string) {
  const separated = string.split(':');
  const seconds = parseInt(separated[separated.length - 1]);
  const minutes = parseInt(separated[separated.length - 2])
  const decimal = (seconds/60) + minutes
  return decimal;
}
