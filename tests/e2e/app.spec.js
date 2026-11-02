const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    const inputField = window.locator('#todo-input');
    await inputField.fill(taskText);

    await window.locator('#add-todo-btn').click();

    const todoItem = window.locator('.todo-item').first();
    await expect(todoItem).toContainText(taskText);

    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    await expect(todoItem).toHaveClass(/completed/);

    const deleteBtn = todoItem.locator('.delete-btn');
    await deleteBtn.click();
    await expect(todoItem).not.toBeVisible();

    await electronApp.close();
});