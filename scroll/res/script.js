
document.addEventListener('mousewheel', function(e){
    e.deltaY < 0 ? scrollEvt('a') : scrollEvt('b');
});
document.addEventListener('DOMMouseScroll', function(e){
    console.log(e);
    e.detail < 0 ? scrollEvt('a') : scrollEvt('b');
});

let si = document.querySelector('section').dataset.scrollIndex;
function scrollEvt(index){
    let boxLength = document.querySelectorAll('article div').length-1;
    if( typeof index !== 'number' ){
            if( index == 'a' ){
                si <= 0 ? si = 0 : si--;
            }else{
                si >= boxLength ? si = boxLength : si++;
            }
        index = si;
    }else{
        index = index-1;
    }
    document.querySelector('section').style.top = -(index * 100) + 'vh';
    document.querySelector('section').dataset.scrollIndex = index;
}

Vue.component('btn', {
    props: ['number'],
    template: `
        <div><button type="button" name="button" @click="moveFn(number+1)">{{ number+1 }}</button></div>
    `,
    methods: {
        moveFn: function(index){
            scrollEvt(index);
        }
    }
});
Vue.component('box', {
    props: ['number','randombg'],
    template: `
        <div v-bind:style="{ backgroundColor: randombg }">BOX {{ number+1 }}</div>
    `,
});

const sectionFn = new Vue({
    el: 'section',
    data: {
        number: 1,
        colorArray: ['#fcba03', '#99ffa7', '#99e0ff', '#e699ff', '#ff99d3', '#ff9999'],
        randombg: null,
    },
    methods: {
        elControl: function(control){
            if(control){ // 추가
                let randomNum = Math.random();
                randomNum = Math.floor(randomNum * 6);
                this.$data.randombg = this.$data.colorArray[randomNum];
                return this.$data.number++;
            }else{ // 삭제
                return this.$data.number--;
            }
        },
    },
});
