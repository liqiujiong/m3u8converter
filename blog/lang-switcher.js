(function () {
    function normalizeLang(value) {
        if (value === 'zh' || value === 'zh-CN') {
            return 'zh';
        }
        return 'en';
    }

    function updateContentVisibility(lang) {
        document.querySelectorAll('[data-lang]').forEach(function (node) {
            var nodeLang = normalizeLang(node.getAttribute('data-lang'));
            node.hidden = nodeLang !== lang;
        });
    }

    function updateButtons(lang) {
        document.querySelectorAll('[data-lang-switcher] [data-lang-target]').forEach(function (button) {
            var buttonLang = normalizeLang(button.getAttribute('data-lang-target'));
            var active = buttonLang === lang;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function applyLang(lang) {
        var normalizedLang = normalizeLang(lang);
        document.documentElement.lang = normalizedLang === 'zh' ? 'zh-CN' : 'en';
        updateContentVisibility(normalizedLang);
        updateButtons(normalizedLang);
        localStorage.setItem('preferred-lang', normalizedLang);
        document.documentElement.setAttribute('data-i18n-ready', '1');
    }

    function bindSwitcherEvents() {
        document.querySelectorAll('[data-lang-switcher]').forEach(function (switcher) {
            switcher.addEventListener('click', function (event) {
                var button = event.target.closest('[data-lang-target]');
                if (!button) {
                    return;
                }
                applyLang(button.getAttribute('data-lang-target'));
            });
        });
    }

    function getInitialLang() {
        var savedLang = localStorage.getItem('preferred-lang');
        if (!savedLang) {
            return 'en';
        }
        return normalizeLang(savedLang);
    }

    function initLangSwitcher() {
        bindSwitcherEvents();
        applyLang(getInitialLang());
    }

    // Keep backward compatibility with existing inline handlers.
    window.setLang = applyLang;
    window.switchLang = applyLang;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLangSwitcher);
    } else {
        initLangSwitcher();
    }
})();
