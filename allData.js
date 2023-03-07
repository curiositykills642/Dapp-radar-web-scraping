const puppeteer = require('puppeteer');


(async () => {  // this will run as soon as script is executed.
  const browser = await puppeteer.launch();  // launches headless browser , browser obj for browser
  const page = await browser.newPage();  // opens a new page , page obj as new tab from browser object

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36');
  
  const data = []; // where data would be pushed.
  
  page.on('response', async (response) => {
    const request = response.request();
    if (request.resourceType() === 'fetch' || ) {
      const content = await response.text();
      const first = content.indexOf("</title><meta content=") + ("</title><meta content=").length;
      const second = content.indexOf('data-server-side name="description"');

      const requestData = { // we have created a dictionary to push multiple data from response.
        "status": response.status(),
        "data": content.slice(first , second),
      };
      data.push(requestData);
    }
  });

  await page.goto('https://dappradar.com/multichain/games/alien-worlds');

  // Perform actions on the webpage that trigger GET requests.

  await browser.close();


  console.log(data);


})();

// we have all the urls

// we have all the about secitons

// we have all the games list 

// we have pointed social links

// we just have to extract it .


