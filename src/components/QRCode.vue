<!-- src/components/QRCode.vue -->
<template>
    <div>
      <h1>Scan to Join Shopping</h1>
      <img :src="qrCodeSrc" alt="QR Code" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        qrCodeSrc: ''
      };
    },
    created() {
      this.fetchQRCode();
    },
    methods: {
      async fetchQRCode() {
      try {
        const response = await fetch('http://10.0.88.221:3000/qrcode');
        const data = await response.json();
        this.qrCodeSrc = data.qrCode;
      } catch (error) {
        console.error('Error fetching QR Code:', error);
      }
    }
    }
  };
  </script>
  