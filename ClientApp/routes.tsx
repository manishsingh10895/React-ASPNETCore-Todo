import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import { Todo } from './components/Todo/todo';
import { TodoDetail } from './components/Todo/todo-detail';
import { NewTodo } from './components/Todo/new-todo';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Todo }} />
    <Route path="/todo/:id" components ={{ body: TodoDetail }} />
    <Route path="/newtodo" components ={{ body: NewTodo }} />
</Route>;

// Allow Hot Module Reloading
declare var module: any;
if (module.hot) {
    module.hot.accept();
}
