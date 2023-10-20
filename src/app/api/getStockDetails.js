import axios from "axios";
const { load } = require("cheerio");
const getDetailsByStockName = async (url) => {
  try {
    const result = await fetch(url);
    const page = await result.text();
    const $ = load(page);
    console.log(url);
    const headTitle = $(".inid_name h1");
    const sectorTitle = $(".inid_name span strong");
    const ticker = $(
      `.comp_inf > li:nth-child(5) > ul:nth-child(2) > li:nth-child(2) > p:nth-child(2)`
    );
    const grabStockPrice = $(".inprice1.nsecp");
    const stockValue = grabStockPrice.attr("rel");
    const change = $(".pricupdn.nsechange");

    const currentDateTime = $(".nseasondate");

    const previousClose = $(".nseprvclose.bseprvclose");
    const todayOpen = $(".nseopn.bseopn");

    const dayLPrice = $(".FL.nseLP");
    const dayHPrice = $(".FR.nseHP");

    const weekLPrice = $(".FL.nseL52");
    const weekHPrice = $(".FR.nseH52");

    const volume = $(".rangamount.nsevol");
    const marketCap = $(".nsemktcap.bsemktcap");
    const dividendYield = $(".nsedy.bsedy");

    console.log(change.text());
    const details = {
      Stock_Name: headTitle.text(),
      Sector: sectorTitle.text(),
      Stock_Price: stockValue,
      Ticker: ticker.text(),
      Price_Change: change.text(),
      date: currentDateTime.text(),
      Previous_Close: previousClose.text(),
      Open: todayOpen.text(),
      Day_Low: dayLPrice.text(),
      Day_High: dayHPrice.text(),
      "52_Week_Low": weekLPrice.innerHTML,
      "52_Week_High": weekHPrice.text(),
      Volume: volume.text(),
      MarketCap: marketCap.text(),
      Dividend_Yield: dividendYield.text(),
    };
    getPlotDetails(ticker.text());
    return details;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPlotDetails = (ticker) => {
  const response = axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}.BSE&outputsize=full&apikey=0552VY0S1GNSVOZF`
  );
  console.log(response)
};

const plot = (data) => {
for(const item in data){
    console.log(item);
    
}
  var options = {
    chart: {
      type: "can",
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();
};


module.exports = { getDetailsByStockName};
