export class TextSwitcher {
    private button: HTMLElement | null;
    private elements: NodeListOf<HTMLElement>;
    private isHumanMode: boolean = false;

    constructor() {
        this.button = document.getElementById('human-mode-toggle');
        this.elements = document.querySelectorAll('[data-human]');

        // Save original text to data-tech attribute on init
        this.elements.forEach(el => {
            if (!el.getAttribute('data-tech')) {
                el.setAttribute('data-tech', el.innerHTML); // Use innerHTML to preserve spans like .text-gradient
            }
        });

        this.init();
    }

    private init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            this.toggleMode();
        });
    }

    private toggleMode() {
        this.isHumanMode = !this.isHumanMode;

        // Update Button State
        if (this.button) {
            this.button.classList.toggle('active', this.isHumanMode);
            this.button.textContent = this.isHumanMode ? '👨‍💻 Zpět na Tech' : '🙂 Lidštinu zapnout';
        }

        // Switch Texts
        this.elements.forEach(el => {
            // Add a fade effect class
            el.style.opacity = '0';

            setTimeout(() => {
                if (this.isHumanMode) {
                    const humanText = el.getAttribute('data-human');
                    if (humanText) el.innerHTML = humanText;
                } else {
                    const techText = el.getAttribute('data-tech');
                    if (techText) el.innerHTML = techText;
                }
                el.style.opacity = '1';
            }, 300); // Wait for fade out
        });
    }
}
