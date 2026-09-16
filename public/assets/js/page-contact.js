const form = document.getElementById('contact-form');
  const formWrapper = document.getElementById('form-wrapper');
  const successBanner = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');
  const errorEl = document.getElementById('form-error');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorEl.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        formWrapper.classList.add('hidden');
        successBanner.classList.remove('hidden');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        showError(data.message || 'Something went wrong. Please try again.');
        resetBtn();
      }
    } catch (_) {
      showError('Network error — please check your connection and try again.');
      resetBtn();
    }
  });

  function resetBtn() {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message →';
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }