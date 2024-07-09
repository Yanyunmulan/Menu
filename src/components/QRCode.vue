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
      fetchQRCode() {
        fetch('http://localhost:3000/qrcode')
          .then(response => response.text())
          .then(data => {
            const imgTag = data.match(/<img src="(.*?)" alt="QR Code" \/>/);
            if (imgTag && imgTag[1]) {
              this.qrCodeSrc = imgTag[1];
            }
          });
      }
    }
  };
  </script>
  