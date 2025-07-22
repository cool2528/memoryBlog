---
title: Vue3组合式API完全指南
date: 2024-01-18 10:30:00
tags: [Vue3, JavaScript, 前端开发, 组合式API]
categories: [Web开发, 前端框架]
excerpt: 深入探索Vue3组合式API的强大功能，从基础概念到高级应用，助你掌握现代Vue开发
---

Vue 3的组合式API（Composition API）为我们带来了更灵活、更强大的组件开发方式。本文将带你深入了解这一革命性的特性。

![Vue3 Logo](https://vuejs.org/images/logo.png)

<!-- more -->

## 🚀 什么是组合式API？

组合式API是Vue 3引入的一套新的API，它允许我们以函数的方式组织组件逻辑，相比选项式API具有更好的逻辑复用性和类型推导能力。

### 核心优势

- **更好的逻辑复用**: 通过组合函数实现逻辑复用
- **更好的类型推导**: 对TypeScript更友好
- **更灵活的代码组织**: 按功能而非选项组织代码
- **更小的打包体积**: 更好的tree-shaking支持

## 📚 基础概念

### setup函数

`setup`是组合式API的入口点：

```javascript
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const user = reactive({
      name: 'Vue',
      age: 3
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回模板需要的数据和方法
    return {
      count,
      user,
      doubleCount,
      increment
    }
  }
}
```

### 响应式API

#### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref: 用于基本类型和对象
const count = ref(0)
const message = ref('Hello Vue3')

// reactive: 用于对象和数组
const state = reactive({
  user: {
    name: 'Alice',
    email: 'alice@example.com'
  },
  todos: []
})

// 访问ref需要.value
console.log(count.value) // 0
count.value++

// reactive直接访问
console.log(state.user.name) // Alice
state.user.name = 'Bob'
```

## 🛠️ 高级应用

### 自定义组合函数

创建可复用的逻辑：

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

使用自定义组合函数：

```javascript
import { useCounter } from '@/composables/useCounter'

export default {
  setup() {
    const { count, doubleCount, increment, decrement, reset } = useCounter(10)
    
    return {
      count,
      doubleCount,
      increment,
      decrement,
      reset
    }
  }
}
```

### 生命周期钩子

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件即将挂载')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onBeforeUpdate(() => {
      console.log('组件即将更新')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onBeforeUnmount(() => {
      console.log('组件即将卸载')
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 🎯 实战案例：待办事项应用

让我们创建一个完整的待办事项应用：

```javascript
// TodoApp.vue
<template>
  <div class="todo-app">
    <h1>待办事项</h1>
    
    <form @submit.prevent="addTodo">
      <input 
        v-model="newTodo" 
        placeholder="添加新任务..."
        required
      >
      <button type="submit">添加</button>
    </form>
    
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul class="todo-list">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
        >
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>
    
    <div class="stats">
      <p>总计: {{ todos.length }}</p>
      <p>已完成: {{ completedCount }}</p>
      <p>未完成: {{ remainingCount }}</p>
    </div>
  </div>
</template>

<script>
import { useTodos } from '@/composables/useTodos'

export default {
  name: 'TodoApp',
  setup() {
    const {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      completedCount,
      remainingCount,
      addTodo,
      removeTodo
    } = useTodos()
    
    return {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      completedCount,
      remainingCount,
      addTodo,
      removeTodo
    }
  }
}
</script>
```

组合函数实现：

```javascript
// composables/useTodos.js
import { ref, reactive, computed } from 'vue'

export function useTodos() {
  const todos = ref([])
  const newTodo = ref('')
  const currentFilter = ref('全部')
  
  const filters = ['全部', '未完成', '已完成']
  
  // 计算属性
  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case '未完成':
        return todos.value.filter(todo => !todo.completed)
      case '已完成':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  const completedCount = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )
  
  const remainingCount = computed(() => 
    todos.value.filter(todo => !todo.completed).length
  )
  
  // 方法
  const addTodo = () => {
    if (newTodo.value.trim()) {
      todos.value.push({
        id: Date.now(),
        text: newTodo.value.trim(),
        completed: false
      })
      newTodo.value = ''
    }
  }
  
  const removeTodo = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }
  
  return {
    todos,
    newTodo,
    currentFilter,
    filters,
    filteredTodos,
    completedCount,
    remainingCount,
    addTodo,
    removeTodo
  }
}
```

## 📊 性能优化

### 使用shallowRef和shallowReactive

```javascript
import { shallowRef, shallowReactive } from 'vue'

// 只有根级别的属性是响应式的
const state = shallowReactive({
  user: { name: 'Alice' }, // 这个对象内部不是响应式的
  count: 0 // 这个是响应式的
})

// 只有.value的赋值是响应式的
const data = shallowRef({
  items: [1, 2, 3] // 数组内部的变化不会触发更新
})
```

### 使用readonly

```javascript
import { reactive, readonly } from 'vue'

const state = reactive({
  count: 0
})

const readonlyState = readonly(state)

// 这会在开发环境发出警告
readonlyState.count++ // 警告: 无法修改只读属性
```

## 🔧 调试技巧

### 使用watchEffect进行调试

```javascript
import { watchEffect } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    // 调试响应式数据变化
    watchEffect(() => {
      console.log('count changed:', count.value)
    })
    
    return { count }
  }
}
```

## 📝 最佳实践

1. **合理使用ref和reactive**
   - 基本类型使用ref
   - 对象和数组使用reactive
   - 需要重新赋值的对象使用ref

2. **组合函数命名**
   - 以use开头
   - 描述性命名
   - 返回对象解构

3. **逻辑分离**
   - 按功能组织代码
   - 提取可复用逻辑
   - 保持setup函数简洁

4. **类型安全**
   - 使用TypeScript
   - 定义明确的接口
   - 利用类型推导

## 🎉 总结

Vue 3的组合式API为我们提供了更强大、更灵活的开发方式。通过合理使用这些API，我们可以：

- 编写更可维护的代码
- 实现更好的逻辑复用
- 获得更好的TypeScript支持
- 构建更高性能的应用

开始在你的项目中使用组合式API吧，体验Vue 3带来的开发乐趣！

---

> 💡 **提示**: 组合式API并不是要完全替代选项式API，你可以在同一个项目中混合使用两种风格。选择最适合你和团队的方式！