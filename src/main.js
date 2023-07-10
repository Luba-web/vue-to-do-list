import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const store = createStore({
  state() {
    return {
      todos: [
        {
          id: '1',
          name: 'My To Do',
          completed: false,
          location: 'home',
        },
      ],
    };
  },
  getters: {
    todos(state) {
      return state.todos;
    },
  },
  mutations: {
    loadStore() {
      if (localStorage.getItem('store')) {
        try {
          this.replaceState(JSON.parse(localStorage.getItem('store')));
        } catch (e) {
          console.log('Could not store', e);
        }
      }
    },
    updateTodo(state, todoItem) {
      let id = todoItem.id;
      let completed = todoItem.completed;
      let name = todoItem.name;
      let findElem = state.todos.find((x) => x.id == id);
      if (findElem !== null) {
        if (completed !== undefined) {
          findElem.completed = completed;
        }
        if (name !== undefined) {
          findElem.name = name;
        }
      } else {
        console.log(`To Do List ${id} couldn't be found`);
      }
    },
    addTodo(state, todoItem) {
      if (
        todoItem.id !== undefined &&
        typeof todoItem.name == 'string' &&
        typeof todoItem.completed == 'boolean'
      ) {
        state.todos.push({
          id: todoItem.id,
          name: todoItem.name,
          completed: todoItem.completed,
          location: 'home',
        });
      }
    },
    deleteTodo(state, todoItem) {
      let id = todoItem.id;
      let removedElem = state.todos.findIndex((x) => x.id == id);
      if (removedElem !== null) {
        state.todos.splice(removedElem, 1);
      }
    },
    moveTodoItem(state, todoItem) {
      let id = todoItem.id;
      let location = todoItem.location;
      let findElem = state.todos.find((x) => x.id == id);
      if (findElem !== null) {
        findElem.location = location;
      } else {
        console.log(`To Do List ${id} couldn't be found`);
      }
    },
  },
});
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

app.use(router).use(store).mount('#app');
