<template>
  <div id="todo-list">
    <div class="todo-list__item" v-for="n in todos" :key="n.id">
      <div
        class="todo-list__holder"
        v-if="n.location == location"
        :data-status="n.completed"
      >
        <div class="todo-list__checkbox" :data-status="n.completed">
          <input
            type="checkbox"
            :data-id="n.id"
            :id="n.id"
            @click="updateTodo"
            :checked="n.completed"
          />
          <label :data-id="n.id" :for="n.id">{{ n.name }}</label>
        </div>
        <div class="todo-list__options">
          <div class="todo-list__delete" @click="deleteItem" :data-id="n.id">
            Delete
          </div>
          <div
            class="todo-list__archive"
            v-if="n.location !== 'archive'"
            @click="archiveItem"
            :data-id="n.id"
          >
            Archive
          </div>
        </div>
      </div>
    </div>
    <div id="todo-list__new" v-if="location === 'home'">
      <input
        type="text"
        placeholder="Add to do.."
        id="todo-list__new-input"
        @keyup="updateItemText"
      />
      <input
        type="submit"
        id="todo-list__new-submit"
        @click="newItem"
        value="Add To Do"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'TodoList',
  data() {
    return {
      newTodoItem: '',
    };
  },
  props: {
    location: String,
  },
  setup() {
    const store = useStore();
    return {
      todos: store.getters.todos,
    };
  },
  methods: {
    updateItemText: function (e) {
      this.newTodoItem = e.currentTarget.value;

      if (e.keyCode === 13) {
        this.newItem();
      }

      return false;
    },
    updateTodo: function (e) {
      let newStatus =
        e.currentTarget.parentElement.getAttribute('data-status') == 'true'
          ? false
          : true;
      this.$store.commit('updateTodo', {
        id: e.currentTarget.getAttribute('data-id'),
        completed: newStatus,
      });
    },
    deleteItem: function (e) {
      this.$store.commit('deleteTodo', {
        id: e.currentTarget.getAttribute('data-id'),
      });
    },
    newItem: function () {
      if (this.newTodoItem !== '') {
        this.$store.commit('addTodo', {
          id: uuidv4(),
          name: this.newTodoItem,
          completed: false,
        });
      }
    },
    archiveItem: function (e) {
      this.$store.commit('moveTodoItem', {
        id: e.currentTarget.getAttribute('data-id'),
        location: 'archive',
      });
    },
  },
};
</script>
<style scoped>
#todo-list {
  border-radius: 14px;
  max-width: 400px;
}
.todo-list__holder {
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.todo-list__options,
.todo-list__checkbox {
  display: flex;
}
#todo-list__new {
  padding: 1rem;
}
#todo-list__new input[type='text'] {
  margin: 0 0 1rem 0;
}

.todo-list__delete,
.todo-list__archive {
  font-size: 0.875rem;
  background: #eee;
  margin: 0 0 0 0.5rem;
  height: 1rem;
  border-radius: 100px;
  transition: all 0.1s ease-out;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
}
.todo-list__checkbox {
  display: flex;
  align-items: center;
}
.todo-list__delete:hover,
.todo-list__archive:hover {
  background: #c7c7c7;
  color: #000;
}
[data-status='false'] label {
  color: #000;
  font-weight: 600;
  cursor: pointer;
}
[data-status='true'] label {
  text-decoration: line-through;
  cursor: pointer;
}
</style>
