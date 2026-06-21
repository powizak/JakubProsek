/**
 * Collapsible "Další reference" section.
 * Toggles `.is-expanded` on the wrapper to drive the CSS grid-rows animation.
 */
export class MoreReferences {
    private wrapper: HTMLElement | null;
    private toggle: HTMLButtonElement | null;
    private label: HTMLElement | null;

    constructor() {
        this.wrapper = document.getElementById('more-references');
        this.toggle = document.getElementById('references-toggle') as HTMLButtonElement | null;
        this.label = this.toggle?.querySelector('.toggle-label') ?? null;

        this.init();
    }

    private init(): void {
        if (!this.wrapper || !this.toggle) return;

        const wrapper = this.wrapper;
        const toggle = this.toggle;
        const label = this.label;

        toggle.addEventListener('click', () => {
            const expanded = wrapper.classList.toggle('is-expanded');
            toggle.setAttribute('aria-expanded', String(expanded));

            if (label) {
                label.textContent = expanded ? 'Skrýt reference' : 'Další reference';
            }
        });
    }
}
