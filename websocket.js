const io = require('socket.io')();

const puppeteer = require('puppeteer');

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



// io.on('connection', client => {  });

io.on('connect', (Socket) => {

  Socket.on('bypassVega', (link) => {
    void async function() {
      var bypassEd = await bypassLink(link);
      Socket.emit('html', bypassEd )
      ;

    }().catch(
      err => 
      Socket.emit('error', err.message )
      );
  })

})



io.listen(process.env.PORT || 3000 );


// const wss = new WebSocketServer({ port: process.env.PORT || 3000 });

// wss.on('connection', function connection(ws) {

//   ws.on('bypassVega',function message(data) {
//     console.log('received: %s', data);

//       void async function() {
//         var bypassEd = await bypassLink(link);
//         socket.send(JSON.stringify({ htmlData: bypassEd}));

//       }().catch(
//         err => 
//         socket.send(JSON.stringify({error: err.message }))
//         );


//   });

//   ws.send('Successfully Connected');

// });