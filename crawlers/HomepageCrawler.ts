import { BrowserRequestHandler, PuppeteerCrawler } from 'crawlee'
import ScrapeType from '../types/scrapeType'


const HomepageCrawler = async (urls: string[]): Promise<ScrapeType[]> => {
  let categoryUrls: ScrapeType[] = []
  const crawler = new PuppeteerCrawler({
    // Here you can set options that are passed to the launchPuppeteer() function.
    launchContext: {
        launchOptions: {
            headless: true,
            // Other Puppeteer options
        },
    },

    async requestHandler({ request, page, enqueueLinks, log, $ }) {
      log.info(`Processing ${request.url}...`)

      // A function to be evaluated by Puppeteer within the browser context.
      const data = await page.$$eval('#menuList a', ($categories) => {
        // const scrapedData: { title: string; /*rank: string;*/ href: string }[] = []
        const scrapedData: ScrapeType[] = []

        // We're getting the title, rank and URL of each post on Hacker News.
        $categories.forEach(($category) => {
          scrapedData.push({
            title: $category.innerText,
            // rank: $post.querySelector('.rank').innerText,
            href: $category.href,
          })
        })

        return scrapedData
      })

      //await Dataset.pushData(data)
      //datas.push(data)
      // categoryUrls = [...categoryUrls, ...data]
      categoryUrls = [...data]

      // const infos = await enqueueLinks({
      //   selector: '#menuList',
      // })

      // if (infos.processedRequests.length === 0) log.info(`${request.url} is the last page!`)
    },
    
    // This function is called if the page processing failed more than maxRequestRetries+1 times.
    failedRequestHandler({ request, log }) {
        log.error(`Request ${request.url} failed too many times.`);
    }
  })

  // await crawler.addRequests([
  //   'https://www.momoshop.com.tw/main/Main.jsp',
  // ])
  await crawler.addRequests(urls)

  await crawler.run()

  return Promise.resolve(categoryUrls)
}

export default HomepageCrawler