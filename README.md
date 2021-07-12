# Now-Scraping
Scrape a Website Using Node.js and Puppeteer on Now.vn. 

This based on this awsome [tutorial](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer) with bug fixed and suitable modification with the web condition

### Installation

To begin, install Puppeteer in your project, run:

```sh
$ npm i puppeteer
```
You would prefer to learn more about the Puppeteer in [here](https://github.com/puppeteer/puppeteer) 

Now to run the program, run:

```sh
$ npm run start
```

### File structure

    .
    ├── browser.php                  # Start the browser
    ├── data.json                    # Place to store data
    ├── index.js                     
    ├── package-lock.json            
    ├── package.json                
    ├── pageController.js            # Control scraping process
    └── pageScramper.md              # Process scraping


### Reference

1. Understand the [official documentation](https://github.com/puppeteer/puppeteer).

### Debugging
1. When you do the scraping, please wait for all Network events to finish by using await, set time out or follow [this](https://stackoverflow.com/questions/56705583/puppeteer-proper-selection-of-inner-text)
2. Also for the scarping, please wait for the element to appear in DOM, you can easily do it by "await page.waitForNavigation({waitUntil: "domcontentloaded"})"

This will prevent you to cause some of the errors
