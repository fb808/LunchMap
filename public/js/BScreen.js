import { backButton } from "./click.js";

export function BScreen() {
    // 루트
    const rootDiv = document.getElementById('root');

    // B
    const BScreenDiv = document.createElement('div');
    BScreenDiv.setAttribute('id', 'B');
    BScreenDiv.innerHTML = '야호';
    rootDiv.appendChild(BScreenDiv);

    const back = document.createElement('button');
    back.setAttribute('id', 'backButton');
    back.onclick = function() { backButton() };
    back.innerHTML = '이전';
    BScreenDiv.appendChild(back);
}