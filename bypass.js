const express = require("express");
var cors = require("cors");
const puppeteer = require('puppeteer');



const app = express();
app.use(cors());

async function startBrowser(headless = true) {
    const browser = await puppeteer.launch({
        headless: headless,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}




async function bypassLink(link) {

  // main linne
  const { browser, page } = await startBrowser(true);

  page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36');
   await page.setDefaultNavigationTimeout(0); 

  await page.goto(link, {
            waitUntil: "networkidle0",
          });

  await Promise.all([
            page.click('div.wait'),
            page.waitForNavigation({waitUntil: 'networkidle0'})
        ]);



  // await page.click('#trials-table > tbody > tr > td:nth-child(5) > form > input.btn.btn-warning.js-show-upgrade-popup',{ clickCount: 2, delay: 1000  });

  await page.waitForSelector("#generater");
  await page.waitFor(7000);
  await page.click('#generater');

  await page.waitForSelector("#showlink");
  await page.waitFor(9000);
  await page.click('#showlink');


// var bypassedPage = await browser.targets()[browser.targets().length-1].page();
// await bypassedPage.waitFor(4000);
// var content = await bypassedPage.content();

await page.waitFor(4000);


const pages = await browser.pages()


 var content = await pages[pages.length - 1].content();
 await browser.close();
 return content;



  // const ss = await page.screenshot({path: 'stat.png'});
  // await browser.close();
}




app.get('/bypass', async function (req, res) {
    
    var link = req.query.url;
    
    const ss = await bypassLink(link);
    // res.contentType("image/png");
    res.send(ss);
});



// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// // error handler middleware
// app.use((error, req, res, next) => {
//   res.status(error.status || 500).send({
//     error: {
//       status: error.status || 500,
//       message: error.message || "Internal Server Error",
//     },
//   });
// });





app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at port 3000....');
});




// // Let's load up a cool dashboard and screenshot it!
// export default async ({ page }: { page: Page }) => {
//   await page.goto('https://vegamovies.lol/?6074aa9ab1=ai8rZm5EcFg0UkJlVUdxT2lTblM5Y0Q2amF3T3NwQndWRk9LTjlTK3djeDFmQ0t0QXEyM1pQRjBVSEYzdkJ4Yjd0Y0kxUGFrM1hqUnppRnRPT0ZWTFFwT1p5UUhpdjVBN0pwak5KZmIyS0E9', { waitUntil: 'networkidle0'});

//   await page.click('div.wait');

//   await page.waitForSelector("#generater");
//   await page.waitFor(2000);
//   await page.click('#generater');


//     await page.waitForSelector("#generater");
//   await page.waitFor(2000);
//   await page.click('#generater');


//     await page.waitForSelector("#pleasewaits");
//   await page.waitFor(2000);
//   await page.click('img.spoint');

  


//   // Enlarge the viewport so we can capture it.
//   // await page.setViewport({ width: 1920, height: 1080 });

//   // Return the screenshot buffer which will trigger this editor to download it.
//   // return page.screenshot({ fullPage: true });
// };