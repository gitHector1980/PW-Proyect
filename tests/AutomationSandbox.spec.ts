import { test,chromium, Browser, Page, expect, } from '@playwright/test';
import { assert } from 'node:console';
import { SandboxPage } from './Pages/SandboxPage';
let textoAEscribir = "Estoy aprendiendo Playwright 😎😎😎";
let url = "https://thefreerangetester.github.io/sandbox-automation-testing/";
//{async ()=> {
//     let browser: Browser;
//     let page; PageRevealEvent;   

    test.describe('Actions en el Automation Sandbox  ', () => {

        test('Click en Btn ID Dinamico', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url);  
           
            })
            await test.step('Puedo hacer click en el boton ID dinamico', async () => {
               const botonDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
               await botonDinamico.click({ force:true });
               await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
            });
                       
        });            

        test('Lleno un campo de texto en Automation @Sanbox', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })            
            await test.step('Puedo ingresar un texto en el Text Box', async () => {
                                                                            //fill Or type    
               await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoAEscribir);
               //await page.getByRole('textbox', { name: 'Un aburrido texto' }).type(textoAEscribir);
            //    await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Enter');
            //    await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Shift+ArrowLeft'); 

            });             
            await test.step('Assert de Payolla ', async () => {
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoAEscribir);
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveText("");                
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(textoAEscribir);
            }); 
            
        });    
            //checkboxes                      
        test('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('Puedo seleccionar un checkbox para Pasta', async () => {
                //Aqui declaramos la instanci u objeto de la clase SanboxPage
                const sandbox = new SandboxPage(page); 
                //await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
                await sandbox.checkPasta();
                //await expect(page.getByLabel('Pasta 🍝'),'El checkbox no estaba seleccionado').toBeChecked();
                await expect(sandbox.pastaCheckbox ,'El checkbox no estaba seleccionado').toBeChecked();                
            })
            await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();                
            })            
        });                            
            //Radio buttons
        test('Puedo seleccionar el Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByRole('radio', { name: 'No' }).check();
                 //await page.getByRole('radio', { name: 'No' }).uncheck();
            })
        });
        test('Seleccionar un item del dropdown', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('seleccionar un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
                 //await page.getByRole('radio', { name: 'No' }).uncheck();
            })
        });
        test.only('Seleccionar un dia del dropdown semana', async ({ page }) => {
            //Anotacion personalizada
            test.info().annotations.push({
                type:'US 13',
                description: 'El usuario puede seleccionar un dia de la semana'
            });                        
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
                await page.goto(url);                           
            });            
            await test.step('Selecciono un dia de la demana del dropdown', async () => {
                //await page.getByRole('combobox', { name: 'Día de la semana' }).selectOption('Domingo');    
                 await page.getByRole('button', { name: 'Día de la semana' }).click();
                 await page.getByRole('link', { name: 'Domingo' }).click();
            })
        });

        test('Subir archivos', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('Subir un archivo', async () => {
                await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf, pathOtroArchivo.pdf,pathArchivo3.pgj']);
                await page.getByLabel('Upload file').setInputFiles(['']);
            })
        });
        test('Hacer un drag and drop de archivos', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('Drag and drop', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
            })
        });
        test('Los Items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              await page.goto(url)                           
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol','Tennis','Basketball','Boshas']
                for(let opcion of deportes){
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);

                    if(element){
                        console.log(`Opcion´ ${opcion} ´presente en la lista`);
                    }else{
                        console.log(`Opcion´ ${opcion} ´No presente en la lista`);
                        //throw new Error(`La opcion´ ${opcion} ´No esta en esta lista`);
                    }
                }
                
            })
        }) 
        test('Validando data en una tabla estática', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              //1- Navegar hacia la URL  
              await page.goto(url)                           
            }) 
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla', async () => {
                //2- Declarar una constante para mediante un locator que contenga toda la lista de los elementos guardarlos.
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)',
                    elements=>elements.map(element =>element.textContent));
                //3- Declarar otra constante para guardar la lista de los elementos que nosotros sabemos que se ven en el DOM de los elementos que contiene esa lista    
                const nombresEsperados =['Messi','Ronaldo','Mbappe'];
                //4- Sacamos una screenshot y la adjuntamos aunque el caso pase
                await test.info().attach('screenshot',{
                    body:await page.screenshot(),
                    contentType:'image/png',
                })
                //5- Comparamos con un assert que las 2 listas sean las mismas y listo
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })   
        })
        test('Tabla Dinámica validando data cambiante despues de un reload', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              //1- Navegar hacia la URL  
              await page.goto(url)                           
            }) 
            await test.step('Puedo validar los valores cambiaron al reload de la web en una tabla dinámica', async () => {
                //Creamos un arreglo para guardar todos los elementos de la tabla
                const valoreasTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',
                    elements=>elements.map(element =>element.textContent));
                //Imprime los valores del primer arreglo de la tabla dnd quedaron guardados    
                console.log(valoreasTablaDinamica);
                //Se hace una page reload    
                await page.reload();
                //Creamos otro arreglo dnd vamos a guardar los elementos de la misma tabla pero despues del reload
                const valoreasTablaDinamicapostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',
                    elements=>elements.map(element =>element.textContent));
                //Imprime en pantalla los valores de la tabla despues del reload    
                console.log(valoreasTablaDinamicapostReload);    
                //Assert dnd se comparan los valores de una tabla y la misma tabla despues del reload
                expect(valoreasTablaDinamica).not.toEqual(valoreasTablaDinamicapostReload);        
            })    
        }) 
        test('Soft Assert', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              //1- Navegar hacia la URL  
              await page.goto(url)                           
            }) 
            await test.step('Valido que todos los elementos del checkbox son correctos', async () => {
               await expect.soft(page.getByText('Pizzaa 🍕'),'no se encontró Pizaa').toBeVisible();
               await expect.soft(page.getByText('Hamburguesa 🍔'),'Si está hamburguesa').toBeVisible();
               await expect.soft(page.getByText('Pasta 🍝')).toBeVisible();
               await expect.soft(page.getByText('Heladoa 🍧'),'no se encontró Heladoa').toBeVisible();
               await expect.soft(page.getByText('Torta 🍰')).toBeVisible();
            })    
        })
        test('Validando dentro de un popUp', async ({ page }) => {
           // const popupPromise = page.waitForEvent('popup');
            await test.step('Dado que navego al SandBox de Automation de Free Rage Testers', async () => {
              //1- Navegar hacia la URL  
              await page.goto(url)                           
            }) 
            await test.step('cuando hago click en el boton popup', async () => {
                await page.getByRole('button', {name: 'Mostrar popup'}).click();
            }) 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                // const popup = await popupPromise;
                // await popup.waitForLoadState();
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', {name: 'Cerrar'}).click();

                //Ejemplo del evento para el popup
                
            })
               
    
        })    
    })
//}}