const XLSX = require('xlsx')
/**
 * 
 * @param {*} fileName 
 * Take File Name as Input 
 * Generates map of states and districts
 */

const generateOutput = async (fileName) => {
    const districts = {};
    const states = {};
    const workbook = await XLSX.readFile(fileName, {
        type: 'array'
    });
    if (workbook.SheetNames.length) {
        const firstSheet = workbook.SheetNames[0];
        const sheet = await XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1, defval: '', blankRows: true });
        if (sheet && sheet.length >= 2) {
            (sheet).slice(1).forEach(column => {
                districts[column[0]] = {
                    id: column[0],
                    district: column[6],
                    latitude: column[4] || 0,
                    longitude: column[5] || 0,
                    population: column[7],
                    male: column[8],
                    female: column[9],
                    literate: column[10],
                    stateDensity: column[1]
                };
                if (states[column[1]]) {
                    const currentState = states[column[1]];
                    states[column[1]] = {
                        ...currentState,
                        population: currentState.population + column[7]
                    }
                } else {
                    states[column[1]] = {
                        id: column[1],
                        address: column[2],
                        latitude: 0,
                        longitude: 0,
                        population: column[7]
                    }
                }
            });
        }
    }
    return { districts, states }
}


exports.generateOutput = generateOutput;
