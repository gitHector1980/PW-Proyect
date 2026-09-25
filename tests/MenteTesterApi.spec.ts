import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test, expect } from '@playwright/test';

type ApiTestCase = {
    name: string;
    method: 'GET';
    path: string;
    expectedStatus: number;
    expectedText: string;
};

type ApiTestData = {
    baseUrl: string;
    tests: ApiTestCase[];
};

const testDataPath = resolve(__dirname, 'APITests', 'mente-tester-api-tests.json');
const testData = JSON.parse(readFileSync(testDataPath, 'utf-8')) as ApiTestData;

test.describe('API smoke tests de Mente Tester', () => {
    for (const apiTest of testData.tests) {
        test(apiTest.name, async ({ request }) => {
            const response = await request.get(`${testData.baseUrl}${apiTest.path}`);
            const responseBody = await response.text();

            expect(response.status()).toBe(apiTest.expectedStatus);
            expect(responseBody).toContain(apiTest.expectedText);
        });
    }
});
