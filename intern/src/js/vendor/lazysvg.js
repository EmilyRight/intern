// <svg data-url="./img/logo.svg"></svg>
export function loadSvg(){
    window.addEventListener('load', function(){
        const svgs = document.querySelectorAll('svg[data-url]');
        const svgsLen = svgs.length;

        for (let i = 0; i < svgsLen; ++i){
            let url = svgs[i].getAttribute('data-url');
            svgs[i].removeAttribute('data-url');

            fetchSVG(url, svgs[i]);
        }
    });
}

const fetchSVG = async function(url, el){//console.log(url);
    let response = await fetch(url);
    let data = await response.text();

    // This response should be an XML document we can parse.
    const parser = new DOMParser();
    const parsed = parser.parseFromString(data, 'image/svg+xml');

    let svg = parsed.getElementsByTagName('svg');
    if (svg.length) {svg = svg[0];
        const attr = svg.attributes, attrLen = attr.length;
        for (let i = 0; i < attrLen; ++i) {
            if (attr[i].specified){
                // Merge classes.
                if ('class' === attr[i].name) {
                    const classes = attr[i].value.replace(/\s+/g, ' ').trim().split(' ');
                    const classesLen = classes.length;
                    for (let j = 0; j < classesLen; ++j){el.classList.add(classes[j])}
                }
                else {el.setAttribute(attr[i].name, attr[i].value)}
            }
        }

        while(svg.childNodes.length){el.appendChild(svg.childNodes[0])}
    }
};
