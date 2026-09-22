import { test, expect, APIRequestContext } from '@playwright/test';
 
const REPO = 'GlobalLogic';
const USER = 'gitHector1980'; 
// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext: APIRequestContext;
let issueNumber: number;
 
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            // Acá ponemos el token que generamos en GitHub.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
 
test.afterAll(async () => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});
 
test('El último issue creado es el primero en la lista', async ({ page}) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    await page.screenshot({ path: 'evidencia-error.png' });
    const firstIssue = page.getByRole
    ('link',{name:'[Feature] Que el framework me planche la ropa'}).first();
    await firstIssue.waitFor({ state: 'visible', timeout:10000 }); // Espera explícita
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});
    test('El último issue creado es el primero en la lista en borrarse', async ({ page }) => {
    const response = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        }        
    });
        expect(response.ok()).toBeTruthy();
        // 2. Extrae y guarda el número que te devolvió la API de GitHub
        const resBody = await response.json();
    issueNumber = resBody.number;
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.getByRole('link', { name: '[Feature] Que el framework me planche la ropa' }).first();
    await firstIssue.waitFor({ state: 'visible', timeout: 10000 }); 
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});

// 3. Este bloque limpia el repositorio de forma automática al finalizar el test
test.afterEach(async () => {
    if (issueNumber) {
        await apiContext.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`, {
            data: {
                state: 'closed' // Cierra el issue automáticamente vía API
            }
        });
    }
});
