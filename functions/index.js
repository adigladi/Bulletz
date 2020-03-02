const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const puppeteer = require("puppeteer");

const pointsLast = async function(num, shorten) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    `https://www.shl.se/statistik/tabell?season=last${num}&location=all`
  );

  const data = await page.evaluate(() => {
    const table = document.querySelector("tbody");
    const teams = Array.from(table.children);
    const home = "Leksand";
    const away = "Malmö";

    let teamPoints = teams
      .map(team => {
        const name = team.querySelector("a").innerText;
        const stat = team.querySelectorAll("td");
        const index = stat[0].innerText;
        const GP = stat[2].innerText;
        const TP = stat[10].innerText;
        return { index, name, GP, TP };
      })
      .filter(
        team =>
          parseInt(team.index) < 4 || team.name === home || team.name === away
      );

    console.log(teamPoints);
    return teamPoints;
  });

  await browser.close();
  return data;
};

exports.scraper = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const data = await pointsLast(5, true);
    response.send(data);
  });
});
