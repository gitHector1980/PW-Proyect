import { test, Browser, Page, expect, } from '@playwright/test';

test.describe('Navegacion en www.freerangetesters.com', () => {

  test('Los links principales redirigen correctamente', async ({ page }) => {

    await test.step('Estando yo en la web principal www.freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com');
      await expect(page).toHaveTitle('Free Range Testers');
    });

    await test.step('Cuando hago click en "Cursos"', async () => {
      // aquí vá tu acción
      page.locator('#page_header').getByRole('link', {name: 'Cursos', exact: true}).click();
      await page.waitForURL('**/cursos');
    });
    await test.step('Soy redirigido a la seccion de titulo "cursos"', async()=>{
        //Validar el titulo de una pagina con un Assert que en playwright se usa la palabra expect
        await expect(page).toHaveTitle('Cursos');
    })
        //Todos estos cases se pueden poner en una lista y recorrerlos con un for loop para que quede mas compacto el codigo
  });

});