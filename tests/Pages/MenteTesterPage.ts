import { type Locator, type Page } from '@playwright/test';

export class MenteTesterPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly spanishLanguageLink: Locator;
    readonly englishLanguageLink: Locator;
    readonly lightThemeLink: Locator;
    readonly menuButton: Locator;
    readonly programsLink: Locator;
    readonly whatsappLink: Locator;
    readonly moduleLinks: Locator;
    readonly freeClassLink: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('link', { name: 'Inicio de Mente Tester' });
        this.spanishLanguageLink = page.getByRole('link', { name: 'ES' });
        this.englishLanguageLink = page.getByRole('link', { name: 'EN' });
        this.lightThemeLink = page.getByRole('link', { name: 'Activar tema claro' });
        this.menuButton = page.getByRole('button', { name: 'menu' });
        this.programsLink = page.locator('a[href="/programas"]').first();
        this.whatsappLink = page.getByRole('link', { name: 'WhatsApp' }).first();
        this.moduleLinks = page.locator('main a[href^="/"]');
        this.freeClassLink = page.locator('a[href="/clase-gratis"]').first();
        this.footer = page.getByRole('contentinfo');
    }

    async goto() {
        await this.page.goto('https://mentetester.com/');
    }

    async openPrograms() {
        await this.programsLink.click();
    }

    async openFreeClass() {
        await this.freeClassLink.click();
    }

    async openWhatsApp() {
        await this.whatsappLink.click();
    }

    async switchToEnglish() {
        await this.englishLanguageLink.click();
    }

    async switchToSpanish() {
        await this.spanishLanguageLink.click();
    }

    async activateLightTheme() {
        await this.lightThemeLink.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }

    moduleLink(name: string) {
        return this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    }
}