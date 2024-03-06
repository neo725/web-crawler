import { BrowserRequestHandler, Dictionary, PuppeteerCrawlingContext } from "crawlee"
import ScrapeType from "../types/scrapeType"

const HomepageRequestHandler = (params: PuppeteerCrawlingContext<Dictionary>, categoryUrls: ScrapeType[]): BrowserRequestHandler => {
  // let categoryUrls: ScrapeType[] = []

  let _handler: BrowserRequestHandler = () => {
    const request = params['request']
    const page = params['page']
    const log = params['log']
    
    // let categoryUrls: params['categoryUrls']

    log.info(`Processing ${request.url}...`)

    // A function to be evaluated by Puppeteer within the browser context.
    const dataPromise = page.$$eval('#menuList a', ($categories) => {
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
    dataPromise.then((data) => {
      categoryUrls = [...categoryUrls, ...data]
    })
  }

  return _handler
}

export default HomepageRequestHandler