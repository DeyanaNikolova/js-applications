import { showVeiw } from './dom.js';

const section = document.getElementById('form-sign-up');
section.remove();

export function showRegister() {
    showVeiw(section);
}