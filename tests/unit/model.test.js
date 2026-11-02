const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
    });

    test('should add a new todo', () => {
        const testText = 'Learn Software Engineering';
        service.addTodo(testText);
        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe(testText);
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo('Task to toggle');
        const newTodo = service.todos[0];
        service.toggleTodoComplete(newTodo.id);
        expect(service.todos[0].completed).toBe(true);
        service.toggleTodoComplete(newTodo.id);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        service.addTodo('Task to remove');
        const newTodo = service.todos[0];
        service.removeTodo(newTodo.id);
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        service.addTodo('');
        expect(service.todos.length).toBe(0);
    });
});