export function makingList(root, item) {
    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    title_area.setAttribute('class', 'recommend');
    root.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', 'recommend');
    title.innerHTML = `${item.title}`;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'recommend');
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    title_area.appendChild(rate);

    const body_area = document.createElement('div');
    body_area.setAttribute('id', 'list_item_body_area');
    body_area.setAttribute('class', 'recommend');
    root.appendChild(body_area);

    const distance = document.createElement('span');
    distance.setAttribute('id', `${item.title}_cate`);
    distance.setAttribute('class', 'recommend');
    distance.innerHTML = `${item.distance}m`;
    body_area.appendChild(distance);

    const cate = document.createElement('span');
    cate.setAttribute('id', `${item.title}_cate`);
    cate.setAttribute('class', 'recommend');
    cate.innerHTML = `#${item.cate_4}`;
    body_area.appendChild(cate);
    
    const tag = document.createElement('span');
    tag.setAttribute('id', `${item.title}_tag`);
    tag.setAttribute('class', 'recommend');
    tag.innerHTML = `${item.tag}  `;
    body_area.appendChild(tag);

    const address = document.createElement('span');
    address.setAttribute('id', `${item.title}_address`);
    address.setAttribute('class', 'recommend');
    address.innerHTML = `${item.address}  `;
    body_area.appendChild(address);
}