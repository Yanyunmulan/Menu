<!-- src/components/Cart.vue -->
<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in cart" :key="item.id">{{ item.name }}</li>
    </ul>
    <input v-model="newItemName" placeholder="Enter item name" />
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      cart: [],
      newItemName: ''
    };
  },
  created() {
    this.ws = new WebSocket('ws://10.0.88.221:3000');

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cart') {
        this.cart = data.cart;
      }
    };
  },
  methods: {
    addItem() {
      if (this.newItemName.trim()) {
        const item = {
          id: Date.now(),
          name: this.newItemName.trim()
        };
        this.ws.send(JSON.stringify({ type: 'add_item', item }));
        this.newItemName = '';
      }
    }
  },
  beforeDestroy() {
    this.ws.close();
  }
};
</script>
