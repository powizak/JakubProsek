import { Animations } from './Animations';

export class Scroller {
    private sections: NodeListOf<HTMLElement>;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private observer: IntersectionObserver;

    constructor() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-links a');

        // Options for the observer (when 30% of section is visible)
        const options = {
            threshold: 0.3
        };

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), options);

        this.init();
    }

    private init() {
        this.sections.forEach(section => {
            this.observer.observe(section);
        });

        // Also observe animated elements specifically
        const animatedElements = document.querySelectorAll('.fade-in-up');
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => elementObserver.observe(el));

        // Observer for Stats animations
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;

                    // Handle Number Counters
                    const countTo = target.getAttribute('data-count-to');
                    if (countTo) {
                        const finalValue = parseInt(countTo);
                        const suffix = target.getAttribute('data-suffix') || '';
                        Animations.animateCountUp(target, finalValue, 2000, suffix);
                        statsObserver.unobserve(target);
                    }

                    // Handle Tech Shuffle
                    if (target.id === 'tech-shuffle') {
                        const languages = ['TypeScript', 'Python', 'Go', 'Rust', 'PHP', 'Java', 'Swift', 'Kotlin', 'SQL', 'Dart'];
                        Animations.shuffleText(target, 'C#', languages, 2000, () => {
                            // Show the AI note
                            const note = target.parentElement?.querySelector('.ai-note');
                            if (note) {
                                note.classList.remove('hidden');
                                note.classList.add('visible');
                            }
                        });
                        statsObserver.unobserve(target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));
    }

    private handleIntersect(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                this.updateNavigation(id);

                // Add visible class to section for CSS transitions
                entry.target.classList.add('in-view');
            }
        });
    }

    private updateNavigation(id: string | null) {
        if (!id) return;

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });

        // Dispatch custom event for Navigation module to pick up if needed
        const event = new CustomEvent('sectionChange', { detail: { id } });
        window.dispatchEvent(event);
    }
}
