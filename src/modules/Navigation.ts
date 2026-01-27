export class Navigation {
    private progressBar: HTMLElement | null;
    private maxScroll: number;

    private ticking: boolean = false;

    constructor() {
        this.progressBar = document.getElementById('progress-indicator');
        this.maxScroll = 0; // Initialized in resize

        this.init();
    }

    private init() {
        if (!this.progressBar) return;

        // Initial calculation
        this.updateDimensions();

        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.onResize.bind(this), { passive: true });
    }

    private updateDimensions() {
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    }

    private onScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateProgress();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    private updateProgress() {
        if (!this.progressBar || this.maxScroll <= 0) return;

        const currentScroll = window.scrollY;
        const scrolledPercentage = (currentScroll / this.maxScroll) * 100;
        this.progressBar.style.height = `${Math.min(scrolledPercentage, 100)}%`;
    }

    private onResize() {
        this.updateDimensions();
        this.onScroll();
    }
}
