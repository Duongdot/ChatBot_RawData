import { Request, Response } from 'express'
import cheerio from 'cheerio'
import request from 'request-promise'
import fs from 'fs'
class CrawlData {
  public async index(req: Request, res: Response) {
    // crawl data with faps
    request('https://greenwich.edu.vn/en/faqs', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html)
        const data: any = []
        $('.gdlr-core-accordion-item-tab').each((index, el) => {
          const question = $(el)
            .find(
              '.gdlr-core-accordion-item-tab .gdlr-core-accordion-item-content-wrapper h4'
            )
            .text()
          const answer = $(el)
            .find(
              '.gdlr-core-accordion-item-tab .gdlr-core-accordion-item-content-wrapper .gdlr-core-accordion-item-content p span'
            )
            .text()
          data.push({
            question,
            answer
          })
        })
        fs.writeFileSync('chatbot/data/faps.json', JSON.stringify(data)) // save data to file crawlData.json
      } else
        return res.json({
          success: false,
          message: 'crawl data failed'
        })
    })
    // crawl data with tuition fee
    const result = await request.get('https://greenwich.edu.vn/en/tuition-fee')
    const $Tuition = cheerio.load(result)
    const firstTable = $Tuition('table').first()
    const scrapedData: any = []
    const rows = firstTable.find('tr')
    rows.each(function (i, row) {
      const cells = $Tuition(row).find('td')
      const fees = $Tuition(cells[0]).text()
      const amount = $Tuition(cells[1]).text()
      const notes = $Tuition(cells[2]).text()
      const tableRow = { fees, amount, notes }
      scrapedData.push(tableRow)
    })
    fs.writeFileSync(
      'chatbot/data/tuitionFee.json',
      JSON.stringify(scrapedData)
    )
    res.json({
      success: true,
      message: 'Tuition fee'
    })
    // crawl data cource computer
    const computerResult = await request.get(
      'https://greenwich.edu.vn/en/course/computing'
    )
    const $Computing = cheerio.load(computerResult)
    const scrapedDataComputer: any = []
    const listTextEditor: any = []
    const overView = $Computing(
      '.elementor-widget-container .elementor-text-editor p'
    ).first()
    const contentOverView = overView.find('span').text()
    const anotherOverView = $Computing(
      '.elementor-widget-container .elementor-text-editor p'
    ).eq(1)
    const contentAnotherOverView = $Computing(anotherOverView)
      .find('span')
      .text()
    $Computing('.elementor-widget-container .elementor-text-editor ul li').each(
      (__index, __elemenet) => {
        const contentList = $Computing(__elemenet).find('span').text()
        listTextEditor.push(contentList)
      }
    )
    scrapedDataComputer.push({
      overView: contentOverView,
      anotherOverView: contentAnotherOverView,
      listTextEditor
    })
    fs.writeFileSync(
      'chatbot/data/cources/computing.json',
      JSON.stringify(scrapedDataComputer)
    )
    // crawl data graphic and digital design
    const graphicResult = await request.get(
      'https://greenwich.edu.vn/en/course/graphic-and-digital-design'
    )
    const $Graphic = cheerio.load(graphicResult)
    const scrapedDataGraphic: any = []
    const overViewGraphic = $Graphic(
      '.elementor-widget-container .elementor-text-editor p'
    ).first()
    const contentOverViewGraphic = overViewGraphic.find('span').text()
    const anotherOverViewGraphic = $Graphic(
      '.elementor-widget-container .elementor-text-editor p'
    ).eq(1)
    const contentAnotherOverViewGraphic = $Graphic(anotherOverViewGraphic)
      .find('span')
      .text()
    scrapedDataGraphic.push({
      overView: contentOverViewGraphic,
      anotherOverView: contentAnotherOverViewGraphic
    })
    fs.writeFileSync(
      'chatbot/data/cources/graphicDigitalDesign.json',
      JSON.stringify(scrapedDataGraphic)
    )
    // crawl data cource business managent
    const businessManagent = await request.get(
      'https://greenwich.edu.vn/en/course/business-management'
    )
    const $Business = cheerio.load(businessManagent)
    const scrapedDataBusiness: any = []
    const firstElementBusiness = $Business(
      '.elementor-widget-container .elementor-text-editor'
    ).first()
    const contentBusiness = firstElementBusiness.find('p')
    contentBusiness.each((indexBusiness, element) => {
      const textBusiness = $Business(element).find('span').text()
      scrapedDataBusiness.push(textBusiness)
    })
    fs.writeFileSync(
      'chatbot/data/cources/business.json',
      JSON.stringify(scrapedDataBusiness)
    )
    // crawl data with event managent
    const eventManagent = await request.get(
      'https://greenwich.edu.vn/en/course/events-management'
    )
    const $Event = cheerio.load(eventManagent)
    const scrapedDataEvent: any = []
    const firstElementEvent = $Event(
      '.elementor-widget-container .elementor-text-editor'
    ).first()
    const contentEvent = firstElementEvent.find('p')
    contentEvent.each((indexBusiness, element) => {
      const textEvent = $Event(element).find('span').text()
      scrapedDataEvent.push(textEvent)
    })
    fs.writeFileSync(
      'chatbot/data/cources/eventManagent.json',
      JSON.stringify(scrapedDataEvent)
    )
    // crawl data with public relation and communication
    const eventRelation = await request.get(
      'https://greenwich.edu.vn/en/course/public-relations-communications'
    )
    const $EventRalation = cheerio.load(eventRelation)
    const scrapedDataRelation: any = []
    const firstElementRelation = $EventRalation(
      '.elementor-widget-container .elementor-text-editor'
    ).first()
    const contentRelation = firstElementRelation.find('p')
    contentRelation.each((indexBusiness, element) => {
      const textRelation = $EventRalation(element).find('span').text()
      scrapedDataRelation.push(textRelation)
    })
    fs.writeFileSync(
      'chatbot/data/cources/relations.json',
      JSON.stringify(scrapedDataRelation)
    )
    // crawl data with cource marketing
    const eventMarketing = await request.get(
      'https://greenwich.edu.vn/en/course/marketing-management'
    )
    const $ = cheerio.load(eventMarketing)
    const scrapedDataMarketing: any = []
    const firstElementMarketing = $(
      '.elementor-widget-container .elementor-text-editor'
    ).first()
    const contentMarketing = firstElementMarketing.find('p')
    contentMarketing.each((indexBusiness, element) => {
      const textMarketing = $(element).find('span').text()
      scrapedDataMarketing.push(textMarketing)
    })
    fs.writeFileSync(
      'chatbot/data/cources/marketing.json',
      JSON.stringify(scrapedDataMarketing)
    )
  }
}

export default new CrawlData()
