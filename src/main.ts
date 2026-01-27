import './styles/main.scss';
import { Scroller } from './modules/Scroller';
import { Navigation } from './modules/Navigation';
import { Cursor } from './modules/Cursor';

document.addEventListener('DOMContentLoaded', () => {
    new Scroller();
    new Navigation();
    new Cursor();

    // Quick console signature
    console.log(
        '%c Jakub Prošek %c Software Architect & AI Evangelist ',
        'background: #333; color: white; padding: 4px; border-radius: 4px 0 0 4px;',
        'background: #00ff88; color: black; padding: 4px; border-radius: 0 4px 4px 0; font-weight: bold;'
    );
});
