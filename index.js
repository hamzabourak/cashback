const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const igraalUrl = "https://fr.igraal.com/ajax/category-merchants/informatique/1";

const vendorsInfo = {};

async function crawl(vendorName, url) {
  var res = 
     await 
      fetch(url)
      .then(res => res.text());

  var dom = new JSDOM(res);
  var merchants = dom.window.document.querySelectorAll("div.widget-merchant-small--details"); 
  vendorsInfo[vendorName] = [];
  for (var i = 0; i < merchants.length; i++) {    
     var m = merchants[i];
     var merchant = m.querySelector("h2").innerHTML;
     var cashBackPercent = m.querySelector(".cashback_rate").innerHTML;
     vendorsInfo[vendorName].push({
       merchant,
       cashBackPercent,
     });
  }
  console.log(JSON.stringify(vendorsInfo));
}

crawl("igraal", igraalUrl);
