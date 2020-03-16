const $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'b', url: 'https://www.bilibili.com/'},
    {logo: 'A', url: 'https://www.acfun.cn/'}
]

simplifyUrl = (url) =>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`
             <li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                           <svg class="icon">
                                <use xlink:href="#icon-close"></use>
                           </svg>
                        </div>
                    </div>
            </li>
        `).insertBefore('.last')
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log("x")
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt("请输入网址")
    if (url.indexOf('https://') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
