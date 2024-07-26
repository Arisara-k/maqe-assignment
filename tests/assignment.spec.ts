import { test, expect } from '@playwright/test';
import { CartPage } from '../page-object/functionForAssignment';

let onCartPage : CartPage

test.describe('Adjust item in cart page', () => {
    test.beforeEach(async ({ page }) => {
        onCartPage = new CartPage (page)
        await page.goto('https://www.bnn.in.th/th');
        await onCartPage.addProductToCart();
    });
  
    test('Verify user able to increase quantity of product in Cart page when click "+" button', async ({ page }) => {
        await onCartPage.clickIncreaseProductQuantity();
    });

    test('Verify user able to decrease quantity of product in Cart page when click "-" button', async ({ page }) => {
        await onCartPage.clickIncreaseProductQuantity();
        await onCartPage.clickDecreaseProductQuantity();
    });

    test('Verify user able to update quantity of product in Cart page when input amount in quantity field', async ({ page }) => {
        await onCartPage.inputProductQuantity('5')
    });

    test('Verify user able to delete product from Cart page when click trash button', async ({ page }) => {
        await onCartPage.deleteProductFromCart();
    });
  });