import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
    // Antes de cada test en esta suite, navega a la página de inicio
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });

    test("should allow a user to log in successfully", async ({ page }) => {
        await page.getByTestId("input-username").fill("demo@test.com");

        await page.getByTestId("input-password").fill("Demo1!");

        // 3. Localiza el botón de login y haz clic en él

        await page.getByTestId("login-button").click();

        // 4. Verifica que el login fue exitoso
        //    IMPORTANTE: Ajusta estas aserciones según el comportamiento de tu app:
        //    - ¿A qué URL te redirige después del login?
        //    - ¿Qué texto o elemento único aparece en el dashboard?

        await expect(page).toHaveURL("/dashboard");

        await expect(page.getByTestId("dashboard-page")).toBeVisible();
    });

    test("should show an error message with invalid credentials", async ({
        page,
    }) => {
        await page.getByTestId("input-username").fill("demo@test.com");

        await page.getByTestId("input-password").fill("Demo!1");

        // 3. Localiza el botón de login y haz clic en él

        await page.getByTestId("login-button").click();

        // IMPORTANTE: Verifica que aparece un mensaje de error y que la URL no ha cambiado
        await expect(page.getByTestId("login-error-text")).toBeVisible(); // <--- ¡CAMBIA ESTO al mensaje de error real de tu app!
        await expect(page).toHaveURL("/login"); // O a la URL de login si es diferente y no te redirige
    });
});
