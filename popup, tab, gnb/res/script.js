// import Vue from "vue";


// tab
let popCon = document.getElementsByClassName('popup_con');
const body = document.getElementsByTagName('body');

const tabConts = new Vue({
    el: '.sec02',
    data: {
        isTab: 1,
        isPopOpen: false,
    },
    methods: {
        tabClick: function(isTab){
            this.$data.isTab = isTab;
        },
        popupOpen: function(event){
            let thisImg = event.target.cloneNode();
            let $data = this.$data;

            Vue.set($data, 'isPopOpen', true);
            // body[0].setAttribute('class', 'pop-open');

            setTimeout(function(){
                popCon = document.getElementsByClassName('popup_con');
                popCon[0].appendChild(thisImg);
            }, 100);
        },
        popupClose: function(event){
            Vue.set(this.$data, 'isPopOpen', false);
            setTimeout(function(){
                popCon[0].childNodes[0].remove();
                // body[0].setAttribute('class', '');
            }, 500);
        }
    }
});

// gnb
/*const navMove = new Vue({
    el: 'nav',
    data: {
        subBool1 : false,
        subBool2 : false,
        subBool3 : false,
        subBool4 : false,
        subBool5 : false,
    },
    methods: {
        navSubOver : function(event){
            let list = Array.prototype.slice.call( document.querySelectorAll('nav > ul > li') );
            let index = list.indexOf(event.target.parentNode);
            let data = 'subBool'+(index+1);

            Vue.set(this.$data, data, true);
        },
        navSubOut : function(event){
            let list = Array.prototype.slice.call( document.querySelectorAll('nav > ul > li') );
            let index = list.indexOf(event.target.parentNode);
            let data = 'subBool'+(index+1);

            Vue.set(this.$data, data, false);
        }
    },
});*/
const navMove = new Vue({
    el: 'nav',
    data: {
        menuIndex: 0,
        subBool : false,
        menuBar: '-8',
    },
    methods: {
        navSubOver : function(index){
            this.$data.menuIndex = index;
            Vue.set(this.$data, 'subBool', true);
            this.$data.menuBar = (436*0.2) * this.$data.menuIndex;
            // console.log(this.$data.menuBar);
        },
        navSubOut : function(index){
            this.$data.menuIndex = 0;
            Vue.set(this.$data, 'subBool', false);
        }
    },
});
