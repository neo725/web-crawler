import ScrapeType from './types/scrapeType'
import HomepageCrawler from './crawlers/HomepageCrawler'

(async () => {
  let urls: string[] = [
    'https://www.momoshop.com.tw/main/Main.jsp'
  ]

  let categories: ScrapeType[] = []

  let _categories: ScrapeType[] = await HomepageCrawler(urls)
  while (_categories.length > 0) {
    categories = [...categories, ..._categories]
    const _ = [..._categories]
    _categories.splice(0)
    _.forEach((category, index) => {

    })
  }

  console.log('categoryUrls: ', categories)

  console.log('Crawler finished.')
})()
