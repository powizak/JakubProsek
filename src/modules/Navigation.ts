export class Navigation {
    private progressBar: HTMLElement | null;
    private maxScroll: number;

    constructor() {
        this.progressBar = document.getElementById('progress-indicator');
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        this.init();
    }

    private init() {
        if (!this.progressBar) return;

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Listen to section changes if we want snap-based progress, 
        // but smooth scroll percentage is better for "Scrollytelling" feel.
    }

    private handleScroll() {
        if (!this.progressBar) return;

        const currentScroll = window.scrollY;
        // Recalculate maxScroll as content might load dynamic
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (this.maxScroll <= 0) return;

        const scrolledPercentage = (currentScroll / this.maxScroll) * 100;
        this.progressBar.style.height = `${Math.min(scrolledPercentage, 100)}%`;
    }

    private handleResize() {
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        this.handleScroll();
    }
}
