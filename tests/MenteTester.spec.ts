import { test, expect } from '@playwright/test';
import { MenteTesterPage } from './Pages/MenteTesterPage';

test('la página principal de Mente Tester carga correctamente', async ({ page }) => {
	const menteTester = new MenteTesterPage(page);

	await menteTester.goto();

	await expect(page).toHaveTitle(/Mente Tester/);
	await expect(page.getByRole('heading', { name: 'De 0 a QA en 6 meses' })).toBeVisible();
	await expect(menteTester.programsLink).toBeVisible();
});

test('el enlace de WhatsApp funciona correctamente', async ({ page }) => {
    const menteTester = new MenteTesterPage(page);
    await menteTester.goto();

	const whatsappPagePromise = page.waitForEvent('popup');
	await menteTester.openWhatsApp();
	const whatsappPage = await whatsappPagePromise;

	await expect(whatsappPage).toHaveURL("https://api.whatsapp.com/send/?phone=18495124529&text=Hola%2C+quiero+empezar+una+ruta+de+QA+en+Mente+Tester.&type=phone_number&app_absent=0");
	await whatsappPage.close();
    await expect(menteTester.whatsappLink).toBeVisible();
});
  