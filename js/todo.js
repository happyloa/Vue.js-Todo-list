// 宣告一個新的 Vue.js 應用程式
var app = new Vue({
  // 綁定帶有 app ID 的 HTML 元素
  el: "#app",
  data: {
    newTodo: "",
    // 待辦事項列表，以陣列來表示
    todos: [
      // 示範物件
      {
        id: "1",
        title: "完成 Vue.js todo list",
        completed: true,
      },
    ],
    cacheTodo: {},
    cacheTitle: "",
    // 預設顯示所有待辦事項
    visibility: "all",
  },
  methods: {
    // 新增一項待辦事項
    addTodo: function () {
      // 宣告 value 變數，將輸入的數值去除前後空白以後指派給它
      var value = this.newTodo.trim();
      // 宣告 timestamp 變數，將目前的時間指派給它
      var timestamp = Math.floor(Date.now());
      // 如果 newTodo 沒有值，那就不從這個函數內回傳任何東西
      if (!value) {
        return;
      }
      // 如果 newTodo 有輸入值的話，那就把組裝好的物件（包含 newTodo 的值、目前時間以及預設未完成的狀態）給送進 todos 陣列內
      this.todos.push({
        id: timestamp,
        title: value,
        computed: false,
      });
      // 觸發 addTodo 函數以後，將 newTodo 輸入欄位給清空
      this.newTodo = "";
    },
    // 移除一項待辦事項
    removeTodo: function (todo) {
      // 宣告一個 vm 變數，將這整個應用程式指派給它
      //var vm = this;
      // 宣告一個 newIndex 變數，從 todos 陣列內尋找物件的索引序數
      var newIndex = this.todos.findIndex(function (item, key) {
        return todo.id === item.id;
      });
      // 以待辦事項的 id 來取得想移除的待辦事項並刪除
      this.todos.splice(newIndex, 1);
    },
    // 指派指定的物件到 cacheTodo 內；指派指定的物件內的 title 項目到 cacheTitle 上
    editTodo: function (item) {
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    // 指派空物件給 cacheTodo
    cancelEdit: function () {
      this.cacheTodo = {};
    },
    // 指派輸入的內容給 todos 陣列內的物件的 title 項目，在這之後，清空 cacheTitle 並指派一個空物件給 cacheTodo
    doneEdit: function (item) {
      item.title = this.cacheTitle;
      this.cacheTitle = "";
      this.cacheTodo = {};
    },
    // 指派一個空陣列給 todos （清除 todos 內所有待辦事項）
    clearAll: function () {
      this.todos = [];
    },
  },
  computed: {
    // 依照 completed 的狀態過濾列表上的內容
    filteredTodos: function () {
      // 如果 visibility 的字串內容是 all，那就回傳所有 todos 陣列內的內容。
      if (this.visibility == "all") {
        return this.todos;
        // 如果 visibility 的字串內容是 active，那就回傳所有在 todos 陣列內的物件的 completed 項目顯示 false 的內容
      } else if (this.visibility == "active") {
        // 宣告一個空的 newTodos 陣列
        var newTodos = [];
        // 取出 todos 陣列內的項目
        this.todos.forEach(function (item) {
          // 如果 todos 陣列內所含的物件裡面的 completed 項目是 false 的話，就將該物件送進 newTodos 陣列內
          if (!item.completed) {
            newTodos.push(item);
          }
        });
        // 回傳含有進行中的待辦事項的 newTodos 陣列
        return newTodos;
        // 如果 visibility 的字串內容是 completed，那就回傳所有在 todos 陣列內的物件的 completed 項目顯示 true 的內容
      } else if (this.visibility == "completed") {
        // 宣告一個空的 newTodos 陣列
        var newTodos = [];
        // 取出 todos 陣列內的項目
        this.todos.forEach(function (item) {
          // 如果 todos 陣列內所含的物件裡面的 completed 項目是 true 的話，就將該物件送進 newTodos 陣列內
          if (item.completed) {
            newTodos.push(item);
          }
        });
        // 回傳含有已完成的待辦事項的 newTodos 陣列
        return newTodos;
      }
    },
    // 宣告一個函數，用來統計未完成的項目
    unFinished: function () {
      // 宣告一個變數 unDos，並指派一個空陣列給它
      var unDos = [];
      // 取出 todos 陣列內的項目
      this.todos.forEach(function (item) {
        // 如果 todos 陣列內所含的物件裡面的 completed 項目的狀態為 false，就將該物件推送到 unDos 陣列內
        if (!item.completed) {
          unDos.push(item);
        }
      });
      // 回傳 unDos 陣列的長度數值
      return unDos.length;
    },
  },
});
