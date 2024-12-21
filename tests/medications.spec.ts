import {test, expect} from '@playwright/test';

test.describe('Search Behavior Test', () => {
  test.beforeEach(async ({page}) => {

    await page.goto('http://localhost:4200');
    const stringifyMockData = "[{\"name\":\"test\",\"dosage\":45,\"unit\":\"Tables\",\"days\":[\"Tue\"],\"times\":[\"2024-12-20T20:45:00.000Z\"],\"lastUpdate\":\"\",\"lastUpdated\":\"2024-12-20T21:14:21.199Z\"},{\"name\":\"tsf\",\"dosage\":0.2,\"unit\":\"Milligrams\",\"days\":[\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\",\"Sun\"],\"times\":[\"2024-12-20T20:45:00.000Z\",\"2024-12-20T21:00:00.000Z\",\"2024-12-20T21:00:00.000Z\",\"2024-12-20T21:00:00.000Z\",\"2024-12-21T03:45:00.000Z\"],\"lastUpdate\":\"\",\"lastUpdated\":\"2024-12-21T15:50:17.271Z\"},{\"name\":\"test\",\"dosage\":0.3,\"unit\":\"Micrograms\",\"days\":[\"Sat\"],\"times\":[\"2024-12-20T20:30:00.000Z\"],\"lastUpdate\":\"\",\"lastUpdated\":\"2024-12-21T15:51:21.266Z\"}]"

    try {
      await page.evaluate((data) => {
        localStorage.setItem('medications', data);
      }, stringifyMockData);
    } catch (error) {
      console.error('Error setting localStorage:', error);
      throw error;
    }

    await page.reload();
  });

  test('should display data from localStorage in the table', async ({page}) => {

    const rows = await page.locator('table tbody tr');
    await expect(rows).toHaveCount(3);

    await expect(rows.nth(0)).toContainText('test');
    await expect(rows.nth(1)).toContainText('tsf');
    await expect(rows.nth(2)).toContainText('test');
  });

  test('should filter table rows based on search input', async ({page}) => {
    const searchInput = page.getByTestId('search-input');
    const rows = page.locator('table tbody tr');
    const noDataMessage = page.locator('text=No data to display!');

    await searchInput.fill('tsf');
    await expect(rows).toHaveCount(1);
    await expect(rows.nth(0)).toContainText('tsf');

    await searchInput.fill('test');
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText('test');

    await searchInput.fill('Nonexistent');
    await expect(rows).toHaveCount(1);
    await expect(noDataMessage).toBeVisible();
  });
});
