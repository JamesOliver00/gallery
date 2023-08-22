let imgArr = Object.values(likedImages).map(i=> i=i.urls);

const delay = ms => new Promise(res => setTimeout(res, ms));
const key='_oHIA1DoM1JKORbk8ZapNtStj6twnwUpGjk6ICxCX8g';


function addToLiked(event){
    let ele = event.target;
    let url = ele.attributes.src.value;
    let form = new FormData();

    form.append('url', url)
    form.append('csrfmiddlewaretoken', document.querySelector('input[name="csrfmiddlewaretoken"]').value)
    //if liked, then add
    if(!ele.classList.contains('liked'))
    {
        fetch('/saveImgUrl',{
            method: "POST",
            body: form
        }).then(response=>response.json())
        .then((data) => {
            imgArr.push(url);
            ele.classList.add('liked');
        });
    }
    else{//if not liked, then remove. 
        fetch('/removeImgUrl',{
            method: "POST",
            body: form
        }).then(response=>response.json())
        .then((data) => {
            let i = imgArr.indexOf(url);
            if (i > -1) {
                imgArr.splice(i, 1);
            }
            ele.classList.remove('liked');
        });
    }
}
async function displayPhoto(img_list){
    let container= document.getElementById('image-container');
    container.innerHTML = '';
    for(i in img_list){
        let img_urls = img_list[i];
        let src = img_urls.urls['regular'];

        //div
        let classList = ['img-box'];
        let newDiv = document.createElement('div');
        newDiv.classList.add(...classList);
        newDiv.addEventListener('dblclick', addToLiked);
        //img
        let newImg = document.createElement('img');
        newImg.src = src;
        classList = ['search-img', 'fade'];
        if(imgArr.includes(src)){
            classList.push('liked');
        }
        newImg.classList.add(...classList);
        //add to DOM
        newDiv.appendChild(newImg);
        container.appendChild(newDiv);
        
        await delay(350);
        document.querySelector('img[src="'+src+'"]').classList.toggle('fade');
    }
    return;
}
async function search(suprise=0){
    let searchFor = search_input.value;
    let url = 'https://api.unsplash.com/search/photos/?query='+searchFor
    if(suprise==1){
        url = 'https://api.unsplash.com/photos/random/?count=10';
    }
    url += '&client_id='+key;
    fetch(url, {
        method:"GET",
    })
    .then(response => response.json())
    .then(async (data) => {
        let img_list = suprise==1?data:data.results;
        displayPhoto(img_list);
    });
}
