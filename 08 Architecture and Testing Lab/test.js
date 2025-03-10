const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
 // const { constants } = require('buffer');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('initial load', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');

        await page.waitForSelector('.accordion');

        // await page.screenshot({path: 'site.png'});
        const content = await page.textContent('#main');
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Unix');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('ALGOL');

    });

    it('More button works', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        await page.waitForSelector('.accordion');

        await page.click('text=More');

        await page.waitForResponse(/articles\/details/i);

      //  await page.waitForSelector('.accordion p');
        const visible = await page.isVisible('.accordion p');

        expect(visible).to.be.true;
    });

    it('Less button works', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        await page.waitForSelector('.accordion');

        await page.click('text=More');
        await page.waitForResponse(/articles\/details/i);

        await page.waitForSelector('.accordion p', { state: 'visible' });
        await page.click('text=Less');

        const visible = await page.isVisible('.accordion p');

        expect(visible).to.be.false;
    });

    // it('form input', async () =>{
    //     await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        
    //     await page.fill('[name="email"]', 'Peter');

    //     await page.waitForTimeout(60000);
    // });
});









// { headless: false, slowMo: 200 }



// (async () =>{
// const browser = await chromium.launch();
// const page = await browser.newPage();
// await page.goto('https://google.com/');
// await page.screenshot({ path: `example.png` });
// await browser.close();
// })();