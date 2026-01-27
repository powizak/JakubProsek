export class Cursor {
    private cursor: HTMLElement | null;

    constructor() {
        this.cursor = document.getElementById('cursor-follower');
        this.init();
    }

    private init() {
        if (!this.cursor) return;

        // Only enable on non-touch devices
        if (matchMedia('(pointer:fine)').matches) {
            document.addEventListener('mousemove', this.moveCursor.bind(this));

            // Add hover effects for clickable elements
            const clickables = document.querySelectorAll('a, button, .service-card, .portfolio-item');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => this.cursor?.classList.add('hover'));
                el.addEventListener('mouseleave', () => this.cursor?.classList.remove('hover'));
            });
        } else {
            this.cursor.style.display = 'none';
        }
    }

    private moveCursor(e: MouseEvent) {
        if (!this.cursor) return;

        // Simple follow logic. For "Avant-Garde", we might want a slight delay (lerp), 
        // but let's keep it Performant (CSS transition handles smoothing).
        // scale(1) is default, will be overridden by hover class if needed, but we handle hover sizing via width/height in CSS usually. 
        // We must preserve translate(-50%, -50%) for centering.
        this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
}
