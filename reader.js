(function () {
  var KEY = 'webatlas_text_size';
  var SIZES = [15, 16, 17, 18, 19, 20, 22, 24];
  var DEFAULT = 3; // 18px

  function getIdx() {
    var s = parseInt(localStorage.getItem(KEY), 10);
    return (Number.isInteger(s) && s >= 0 && s < SIZES.length) ? s : DEFAULT;
  }

  function apply(idx) {
    document.documentElement.style.setProperty('--reader-fz', SIZES[idx] + 'px');
    try { localStorage.setItem(KEY, String(idx)); } catch (e) {}
  }

  function init() {
    var idx = getIdx();
    apply(idx);

    document.querySelectorAll('.font-control [data-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var a = btn.getAttribute('data-action');
        if (a === 'inc') idx = Math.min(idx + 1, SIZES.length - 1);
        else if (a === 'dec') idx = Math.max(idx - 1, 0);
        else if (a === 'reset') idx = DEFAULT;
        apply(idx);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
