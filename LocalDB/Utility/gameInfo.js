const { getAllDataFromTable } = require('../Db/dbInteractions.js');
const { setUpGame } = require('../Utility/gameMenu.js');

function createGameInfoStatistics(rows, rowInfo, countZeros) {
    const totalGames = rows.length;

    const totalValues = rowInfo.map(info =>
        rows.reduce((sum, row) => sum + row[info], 0)
    );

    const averageValues = totalValues.map((total, index) => {
        const info = rowInfo[index];
        const divisor = countZeros ? totalGames : rows.filter(row => row[info] !== 0).length || 1;
        return Math.round(total / divisor);
    });

    console.log(`Total Games: ${totalGames}`);

    rowInfo.forEach((info, index) => {
        console.log(`Average ${info}: ${averageValues[index].toFixed(2)}`);
    });
}

function createGameInfoHistory(rows, gameName, rowInfo) {
    console.log(`${gameName} history:`);
    rows.forEach((row) => {
        let rowString = `  - `;
        rowInfo.forEach(info => {
            rowString += `${info}: ${row[info]}, `;
        });

        rowString = rowString.slice(0, -2);
        console.log(rowString);
    });
}

async function displayGameInfoHistory(tableName, gameName, rowInfo, mainMenuConfig) {
    createGameInfoHistory(await getAllDataFromTable(tableName), gameName, rowInfo,);
    setUpGame(mainMenuConfig); // Call setUpGame to return to the main menu
}

async function displayGameInfoStatistics(tableName, rowInfo, countZeros, mainMenuConfig) {
    createGameInfoStatistics(await getAllDataFromTable(tableName), rowInfo, countZeros);
    setUpGame(mainMenuConfig); // Call setUpGame to return to the main menu
}

module.exports = { displayGameInfoStatistics, displayGameInfoHistory };