// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;

// GLOBAL.document = new JSDOM(html).window.document;

const scraperObject = {
    url: 'https://www.now.vn',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.list-restaurant');
        // Get the link to all the required books
        let urls = await page.$$eval('#app > div > div.contain-main-home.clearfix > div > div > div.now-list-restaurant.deal-tab > div.list-restaurant > div.item-restaurant', links => {
            links = links.map(el => el.querySelector('a.item-content').href)
            return links;
        });

        console.log(urls);

        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = async (link) => new Promise(async(resolve, reject) => {

            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link,{waitUntil: 'networkidle2'});
            // // await page.waitForSelector('.address-restaurant');
            // await page.evaluate(() => {
            //     let price = document.querySelector(".address-restaurant").innerText;
            //     console.log(price);
            // });

            try {
                // // await page.setDefaultNavigationTimeout(0)
                // await page.waitForNavigation({waitUntil: "domcontentloaded"})
                // await page.waitForSelector('.app');
                // var num_full = document.querySelectorAll('.full').length;
                // var num_half = document.querySelectorAll('.half').length;
                dataObj['name'] = await newPage.$eval('#app > div > div.now-detail-restaurant.clearfix > div > div.detail-restaurant-info > h1', text => text.textContent);
                // dataObj['name'] = await newPage.evaluate(() => {
                //     const name = document.querySelector('#app > div > div.now-detail-restaurant.clearfix > div > div.detail-restaurant-info > h1').innerText.trim();
                //     return name;
                // });
                dataObj['address'] = await newPage.$eval('.address-restaurant', text => text.textContent);
                dataObj['cost_min'] = await newPage.$eval('.cost-restaurant', text => {
                    // Strip new line and tab spaces
                    text = text.textContent.replace(/,|\s/gm, "");
                    // Get the number of stock available
                    let cost_min = text.split("-")[0];
                    return cost_min;
                });
                dataObj['cost_max'] = await newPage.$eval('.cost-restaurant', text => {
                    // Strip new line and tab spaces
                    text = text.textContent.replace(/,|\s/gm, "");
                    // Get the number of stock available
                    let cost_max = text.split("-")[1];
                    return cost_max;
                });
                resolve(dataObj);
                await newPage.close();
            } catch (e) {
                // var num_full = 0;
                // var num_half = 0;
                console.log(e);
            }

        });

        let scrapedData = [];

        for(link in urls){
            try {
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                console.log(currentPageData);
            } catch(e) {
                console.log(e);
            }
            
        }
        
        return scrapedData;

    }
}

module.exports = scraperObject;