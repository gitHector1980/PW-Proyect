import { test, expect } from '@playwright/test';
const REPO = 'REPOLOCO'; 
//const REPO = 'GlobalLogic';
const USER = 'gitHector1980';

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeFalsy();
});
 
test('Puedo crear un bug en el repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Explotó todo',
            body: 'Estamos perdidirijillos!',
        }
    });
    console.log('Error de GitHub:', await newIssue.json());
    //expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();

    const resBody = await issues.json();
    //Validamos que al menos un issue de la lista tenga el título esperado
    const issueExiste = resBody.some((issue: any)=> issue.title ==='[Bug] Explotó todo');
    expect(issueExiste).toBeTruthy();
    // expect(await issues.json()).toContainEqual(expect.objectContaining({
    //     title: '[Bug] Explotó todo',
    //     body: 'Estamos perdidirijillos!'
});
 
test('Puedo crear un feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.status()).toBe(201);
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    const resBody1 = await issues.json();

    const issueExist = resBody1.some((issue: any)=> issue.title ==='[Feature] Quiero que haga helados');
    expect(issueExist).toBeTruthy();
    // expect(await issues.json()).toContainEqual(expect.objectContaining({
    //     title: '[Feature] Quiero que haga helados',
    //     body: 'Estaría buenísimo que el repo haga helados 🍦'
    // }));
});
test.afterAll(async ({ request }) => {
    const response=await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();    
});
