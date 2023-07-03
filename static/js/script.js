document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qr-form');
    const qrCodeContainer = document.getElementById('qr-code');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log("1")

      const formData = new FormData(form);
      const data = formData.get('data');

      // Make a request to the server to generate the QR code
      const response = await fetch('http://127.0.0.1:8000/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      console.log("2")
      if (response.ok) {
        const qrCodeData = await response.json();
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = qrCodeData.image_url;
        console.log("3")
        // Clear any previous QR codes
        qrCodeContainer.innerHTML = '';
        // Append the new QR code image
        qrCodeContainer.appendChild(qrCodeImage);
        console.log(qrCodeContainer)
      } else {
        console.error('QR code generation failed.');
      }
    });
  });

