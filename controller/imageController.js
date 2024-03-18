import puppeteer from "puppeteer";

export const getScreenshot = async (req, fileName) => {
    const { url } = req.query;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1080, height: 1920 });
        await page.goto("http://localhost:3000/" + url);
        // wait for background image to load
        await page.waitForSelector("#tester");

        await page.screenshot({
            type: "png",
            path: `./generated/temp/${fileName}.png`
        });
    } catch (error) {
        console.error("Error occurred while taking screenshot:", error);
    } finally {
        await browser.close();
    }

}