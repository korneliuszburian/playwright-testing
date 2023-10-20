// Import necessary libraries and device configurations
import { test } from '@playwright/test';
import { foldedViewport, unfoldedViewport } from './deviceParams';

// Define a descriptive block for foldable phone tests
test.describe('Foldable Phone Tests', () => {

  // Test case for folded state
  test('Test on Folded State', async ({ page }) => {
    await page.setViewportSize(foldedViewport);
    await page.goto('https://mcp.rekurencja.com');
  });

  // Test case for unfolded state
  test('Test on Unfolded State', async ({ page }) => {
    await page.setViewportSize(unfoldedViewport);
    await page.goto('https://mcp.rekurencja.com');
  });
});

test.describe('Desktop Tests', () => {
    test('Test on Desktop', async ({ page }) => {
        await page.goto('https://mcp.rekurencja.com');
    });
    }
);