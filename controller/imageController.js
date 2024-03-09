import puppeteer from "puppeteer";

export const getScreenshot = async (req, fileName) => {
    const { url } = req.query;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });
    await page.goto("http://localhost:3000/" + url);
    await page.screenshot({
        type: "png",
        path: `./generated/${fileName}.png`
    });
    await browser.close();

}