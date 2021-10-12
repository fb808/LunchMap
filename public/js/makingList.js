export function makingList(root, item, className) {
    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    title_area.setAttribute('class', className);
    root.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', className);
    title.innerHTML = `${item.title}`;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', className);
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    title_area.appendChild(rate);

    const body_area = document.createElement('span');
    body_area.setAttribute('id', 'list_item_body_area');
    body_area.setAttribute('class', className);
    root.appendChild(body_area);

    const distance = document.createElement('div');
    distance.setAttribute('id', `${item.title}_distance`);
    distance.setAttribute('class', className);
    distance.innerHTML = `${item.distance}m`;
    body_area.appendChild(distance);
    
    if (className == 'recommend') {
        const cate = document.createElement('div');
        cate.setAttribute('id', `${item.title}_cate`);
        cate.setAttribute('class', className);
        cate.innerHTML = `#${item.cate_4}`;
        body_area.appendChild(cate);

        const tag = document.createElement('div');
        tag.setAttribute('id', `${item.title}_tag`);
        tag.setAttribute('class', className);
        tag.innerHTML = `${item.tag}  `;
        body_area.appendChild(tag);
        
    } else {
        const cateArea = document.createElement('div');
        cateArea.setAttribute('id', 'cate_area');
        cateArea.setAttribute('class', className);
        body_area.appendChild(cateArea);

        const cate = document.createElement('span');
        cate.setAttribute('id', `${item.title}_cate`);
        cate.setAttribute('class', className);
        cate.innerHTML = `#${item.cate_4}`;
        cateArea.appendChild(cate);

        const tag = document.createElement('span');
        tag.setAttribute('id', `${item.title}_tag`);
        tag.setAttribute('class', className);
        tag.innerHTML = `${item.tag}  `;
        cateArea.appendChild(tag);
    }

    const address = document.createElement('span');
    address.setAttribute('id', `${item.title}_address`);
    address.setAttribute('class', className);
    address.innerHTML = `${item.address}  `;
    body_area.appendChild(address);

    const shortcut = document.createElement('button');
        shortcut.setAttribute('id', 'shortcut_button');
        shortcut.setAttribute('class', 'shortcut');
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