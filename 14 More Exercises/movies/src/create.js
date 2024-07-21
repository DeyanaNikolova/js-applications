import { showVeiw } from './dom.js';

const section = document.getElementById('add-movie');
section.remove();

export function showCreate() {
    showVeiw(section);
}