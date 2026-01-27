export class Animations {
    constructor() { }

    public static animateCountUp(element: HTMLElement, target: number, duration: number = 2000, suffix: string = '') {
        let start = 0;
        const startTime = performance.now();

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (target - start) * ease);
            element.textContent = `${current}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
    }

    public static shuffleText(element: HTMLElement, finalString: string, possibleStrings: string[], duration: number = 2000, onComplete?: () => void) {
        const startTime = performance.now();
        const interval = 100; // Change text every 100ms
        let lastUpdate = 0;

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            if (elapsed >= duration) {
                element.textContent = finalString;
                if (onComplete) onComplete();
                return;
            }

            if (currentTime - lastUpdate > interval) {
                const randomIndex = Math.floor(Math.random() * possibleStrings.length);
                element.textContent = possibleStrings[randomIndex];
                lastUpdate = currentTime;
            }

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }
}
