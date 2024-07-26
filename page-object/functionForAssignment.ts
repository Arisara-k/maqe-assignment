import {test,expect,Locator,Page} from '@playwright/test'
export class CartPage {
    readonly page:Page
    readonly productItem:Locator
    readonly addToCartButton:Locator
    readonly cartBadge:Locator
    readonly viewCartInModalButton:Locator
    readonly closeNotificationButton:Locator
    readonly pageTitle:Locator
    readonly increaseQuantityButton:Locator
    readonly quantityField:Locator
    readonly decreaseQuantityButton:Locator
    readonly deleteProductButton:Locator
    readonly emptyCartPage:Locator
    readonly closeNotificationModal1Button:Locator
    readonly notificationModal1:Locator
    readonly notificationModal2:Locator
    
    constructor(page:Page) {
        this.page = page
        this.productItem = page.locator("div.swiper-slide.slide-product-list-item-1.swiper-slide-next > a > div.product-item-top").nth(0)
        this.addToCartButton = page.locator('button.btn-add-to-cart')
        this.cartBadge = page.locator('span.cart-badge.badge')
        this.viewCartInModalButton = page.locator('a.btn-view-shopping-cart')
        this.closeNotificationButton = page.locator('[id="ins-editable-button-1580496494"]')
        this.pageTitle = page.locator('section.cart-product-container > h1')
        this.increaseQuantityButton = page.locator('button.btn-increase')
        this.quantityField = page.locator('input.input-product-quantity')
        this.decreaseQuantityButton = page.locator('button.btn-decrease')
        this.deleteProductButton = page.locator('button.btn-delete')
        this.emptyCartPage = page.locator('section.cart-product-empty-container')
        this.closeNotificationModal1Button = page.locator('div.decline-button')
        this.notificationModal1 = page.locator('div.ins-notification-content.ins-notification-content-15042').nth(0)
        this.notificationModal2 = page.locator('div.ins-web-opt-in-reminder-image')
    }

    async addProductToCart() {
        await this.productItem.click();
        await this.addToCartButton.click();
        await expect(this.cartBadge).toHaveText('1')
        await this.closeNotification();
        await this.viewCartInModalButton.click();
    }

    async clickIncreaseProductQuantity() {
        await this.increaseQuantityButton.click();
        await this.pageTitle.click();
        await this.page.waitForTimeout(1000)
        await expect(this.pageTitle).toContainText('2')
        await expect(this.cartBadge).toHaveText('2')
    }

    async clickDecreaseProductQuantity() {
        await this.decreaseQuantityButton.click();
        await this.pageTitle.click();
        await this.page.waitForTimeout(1000)
        await expect(this.pageTitle).toContainText('1')
        await expect(this.cartBadge).toHaveText('1')
    }

    async inputProductQuantity(amount: string) {
        await this.quantityField.fill(amount)
        await this.pageTitle.click();
        await expect(this.pageTitle).toContainText(amount)
        await expect(this.cartBadge).toHaveText(amount)
    }

    async deleteProductFromCart() {
        await this.deleteProductButton.click();
        await expect(this.emptyCartPage).toBeVisible()
    }

    async closeNotification() {
        if (await this.notificationModal1.isVisible()) {
            await this.closeNotificationModal1Button.click()
        } 
        else if (await this.notificationModal2.isVisible()) {
            await this.closeNotificationButton.click();
        }
        else {
            throw new Error('No Notification Modal');
        }
    }
}