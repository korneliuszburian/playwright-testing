import { test, expect } from '@playwright/test';


// Define the list of browsers to test
const browsers = ['chromium', 'firefox', 'webkit', 'electron'];

// Loop through each browser
for (const browserType of browsers) {
    test.describe(`[${browserType}] Check image aspect-ratio in style attribute`, () => {
        test(`Inspect aspect-ratio in ${browserType}`, async ({ playwright }) => {
            const browser = await playwright[browserType].launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            // Navigate to the URL
            await page.goto('https://mcp.rekurencja.com/');

            // Select all images
            const images = await page.$$('img');

            // Check each image for the aspect-ratio in style attribute
            for (const image of images) {
                const styleAttributeValue = await image.getAttribute('style');
                // Check if aspect-ratio is correctly set in the style attribute
                if (styleAttributeValue && styleAttributeValue.includes('aspect-ratio')) {
                    console.log('Aspect-ratio found in style attribute for an image.');
                } else {
                    // Log or handle cases where aspect-ratio is not set
                    console.log('Aspect-ratio not set in style attribute for an image.');
                }
            }

            await browser.close();
        });
    });
}
