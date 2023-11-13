import { test, expect } from '@playwright/test';
// import fetch from 'node-fetch'; // Static import of node-fetch
import { parseStringPromise } from 'xml2js';
import { fetch } from 'fetch-h2';

async function fetchUrl(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
}

async function getSitemapUrls(sitemapIndexUrl: string): Promise<string[]> {
    const sitemapIndexXml = await fetchUrl(sitemapIndexUrl);
    const parsedIndex = await parseStringPromise(sitemapIndexXml);
    const sitemapUrls = parsedIndex.sitemapindex.sitemap.map((sitemap: any) => sitemap.loc[0]);

    let allUrls: string[] = [];
    for (const sitemapUrl of sitemapUrls) {
        const sitemapXml = await fetchUrl(sitemapUrl);
        const parsedSitemap = await parseStringPromise(sitemapXml);
        const urls = parsedSitemap.urlset.url.map((urlEntry: any) => urlEntry.loc[0]);
        allUrls = allUrls.concat(urls);
    }
    return allUrls;
}

test.describe('Sitemap Page Tests', () => {
    let urls: string[];

    test.beforeAll(async () => {
        urls = await getSitemapUrls('https://mcp.rekurencja.com/sitemap_index.xml');
    });

    test('Check pages', async ({ page }) => {
        for (const url of urls) {
            await page.goto(url);
            const title = await page.title();
            expect(title).not.toBe('');
            // Add more checks as needed
        }
    });
});

test.describe('Image Parameter and Aspect Ratio Tests', () => {
    test('Check Image Parameters and Aspect Ratio', async ({ page, browserName }) => {
        console.log(`Running test on: ${browserName}`);

        const images = await page.$$('img');

        for (const image of images) {
            const imageInfo = await page.evaluate((img) => {
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                const style = getComputedStyle(img);
                const hasInlineStyle = img.getAttribute('style') ? true : false;

                return {
                    src: img.src,
                    naturalWidth,
                    naturalHeight,
                    computedWidth: style.width,
                    computedHeight: style.height,
                    hasInlineStyle,
                    aspectRatio: style.aspectRatio,
                };
            }, image);

            console.log(`Image Info: ${JSON.stringify(imageInfo)}`);

            if (imageInfo.hasInlineStyle ||
                imageInfo.computedWidth.replace('px', '') !== imageInfo.naturalWidth.toString() ||
                imageInfo.computedHeight.replace('px', '') !== imageInfo.naturalHeight.toString()) {
                console.log(`Image ${imageInfo.src} has custom parameters.`);
            } else {
                imageInfo.aspectRatio ? console.log(`Image ${imageInfo.src} has aspect-ratio parameter.`) :
                    console.log(`Image ${imageInfo.src} has default parameters.`);
            }
        }
    }
    );
});



