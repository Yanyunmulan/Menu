<!-- src/components/CartV3.vue -->
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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      newItemName: ''
    };
  },
  computed: {
    ...mapState(['cart'])
  },
  created() {
    this.$store.dispatch('initializeWebSocket');
  },
  methods: {
    ...mapActions(['initializeWebSocket', 'addItemToCart']),
    addItem() {
      if (this.newItemName.trim()) {
        const item = {
          id: Date.now(),
          name: this.newItemName.trim()
        };
        this.$store.dispatch('addItemToCart', item);
        this.newItemName = '';
      }
    }
  }
};
</script>
