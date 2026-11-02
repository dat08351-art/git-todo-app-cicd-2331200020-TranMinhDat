const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const testText = 'Buy groceries';
        controller.handleAddTodo(testText);
        const todos = service.todos;
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(testText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Task to delete');
        const newTodo = service.todos[0];
        controller.handleRemoveTodo(newTodo.id);
        expect(service.todos.length).toBe(0);
    });
});