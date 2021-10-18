export function makingList(root, item) {
    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    root.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.innerHTML = `${item.title}`;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'text-warning');
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    title_area.appendChild(rate);

    const body_area = document.createElement('span');
    body_area.setAttribute('id', 'list_item_body_area');
    root.appendChild(body_area);

    const distance = document.createElement('div');
    distance.setAttribute('id', `${item.title}_distance`);
    distance.setAttribute('class', 'text-danger');
    distance.innerHTML = `${item.distance}m`;
    body_area.appendChild(distance);

    const cateArea = document.createElement('div');
    cateArea.setAttribute('id', 'cate_area');
    body_area.appendChild(cateArea);

    const cate = document.createElement('span');
    cate.setAttribute('id', `${item.title}_cate`);
    cate.setAttribute('class', 'text-primary');
    cate.innerHTML = `#${item.cate_4}`;
    cateArea.appendChild(cate);

    const tag = document.createElement('span');
    tag.setAttribute('id', `${item.title}_tag`);
    tag.innerHTML = `${item.tag}  `;
    cateArea.appendChild(tag);

    const address = document.createElement('span');
    address.setAttribute('id', `${item.title}_address`);
    address.setAttribute('class', 'text-secondary');
    address.innerHTML = `${item.address}  `;
    body_area.appendChild(address);

    const shortcut = document.createElement('button');
        shortcut.setAttribute('id', 'shortcut_button');
        shortcut.setAttribute('class', 'btn btn-outline-dark btn-sm');
        shortcut.innerHTML = '&#10145';
        shortcut.onclick = function (e) {
            e.stopPropagation();
            let searchName = item.area + ' ' +item.title;
            console.log(searchName);
            let win = window.open(item.link);
            win.focus();
        }
    root.appendChild(shortcut);
}