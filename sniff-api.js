const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const apiCalls = [];

  page.on('request', (req) => {
    const url = req.url();
    if (!url.includes('google') && !url.includes('sentry') && !url.includes('analytics') &&
        (url.includes('api') || url.includes('store') || url.includes('coupon') || url.includes('order') || url.includes('menu'))) {
      apiCalls.push({ method: req.method(), url, body: req.postData() });
    }
  });

  page.on('response', async (res) => {
    const url = res.url();
    if (!url.includes('google') && !url.includes('sentry') && !url.includes('analytics') &&
        (url.includes('api') || url.includes('store') || url.includes('coupon') || url.includes('order') || url.includes('menu'))) {
      const ct = res.headers()['content-type'] || '';
      if (ct.includes('json')) {
        const body = await res.text().catch(() => '');
        console.log(`\n[${res.status()}] ${url}`);
        console.log(body.substring(0, 300));
      }
    }
  });

  console.log('Browser opent Dominos... Vul het adres in en ga naar het menu. Ik log alle API calls.');
  await page.goto('https://bestellen.dominos.nl', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wacht 90 seconden zodat je kan navigeren — vul adres in en ga naar menu
  console.log('\n>>> Browser is open. Vul adres in: Waterloolaan 1, Driehuis en ga naar het menu <<<\n');
  await page.waitForTimeout(90000);

  console.log('\n\nAlle API calls gevonden:');
  apiCalls.forEach(c => console.log(c.method, c.url));

  await browser.close();
})();
