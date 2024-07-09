<!-- src/App.vue -->
<template>
  <div id="app">
    <QRCode />

    <Cart />
  </div>
</template>

<script>
import QRCode from './components/QRCode.vue';

import Cart from './components/ourCart.vue';

export default {
  name: 'App',
  components: {
    Cart,
    QRCode
  }
};
</script>
