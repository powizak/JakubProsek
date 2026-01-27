import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const htmlPath = path.join(distDir, 'index.html');

console.log('Inlining assets into index.html...');

try {
    let html = fs.readFileSync(htmlPath, 'utf-8');

    // Inline CSS
    const cssMatch = html.match(/<link rel="stylesheet".*?href="\/assets\/(.*?\.css)">/);
    if (cssMatch) {
        const cssFile = cssMatch[1];
        const cssPath = path.join(distDir, 'assets', cssFile);
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf-8');
            html = html.replace(cssMatch[0], `<style>${cssContent}</style>`);
            console.log(`Inlined CSS: ${cssFile}`);
        }
    }

    // Inline JS (Module)
    const jsMatch = html.match(/<script type="module".*?src="\/assets\/(.*?\.js)"><\/script>/);
    if (jsMatch) {
        const jsFile = jsMatch[1];
        const jsPath = path.join(distDir, 'assets', jsFile);
        if (fs.existsSync(jsPath)) {
            const jsContent = fs.readFileSync(jsPath, 'utf-8');
            // Remove imports from the JS content if they are just about CSS (already handled)
            // But usually Vite production build JS doesn't have CSS imports.

            // We need to keep type="module" to enable strict mode and other module features, 
            // but inline scripts with type="module" work fine in modern browsers.
            html = html.replace(jsMatch[0], `<script type="module">${jsContent}</script>`);
            console.log(`Inlined JS: ${jsFile}`);
        }
    }

    fs.writeFileSync(htmlPath, html);
    console.log('Successfully inlined assets!');

} catch (error) {
    console.error('Error inlining assets:', error);
    process.exit(1);
}
