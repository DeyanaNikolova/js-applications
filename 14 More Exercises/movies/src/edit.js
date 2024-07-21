import { showVeiw } from './dom.js';

const section = document.getElementById('edit-movie');
section.remove();

export function showEdit() {
    showVeiw(section);
}