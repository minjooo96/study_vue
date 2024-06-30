
Vue.component('mapbox', {
    props:['img'],
    template: `
        <area v-on:mouseover="compChangeImg(img, 1)" v-on:click="compChangeImg(img, 0)" href="javascript:;" shape="poly">
    `,
    methods: {
        compChangeImg: function(img, over){
            this.$emit('overimg', img, over);
        }
    }
});

const mapVue = new Vue({
    el: '.fuel_costs',
    data: {
        nowAreaName: '강원도',
        nowAreaImg: 'map_gangwon',
        selcAreaImg: 'map_gangwon',
        nowAreaSubsidy: '770',
        nowAreaIndex: 0,
        nowpurchasePrice: 1190-770,
        mapArray: []
    },
    created(){
        let data = this.$data;
        axios.get('res/list.json').then(function(e){ Vue.set(data, 'mapArray', e.data); });
    },
    methods: {
        changeImg: function(img, over){
            let nowAreaImg = img;
            let nowAreaIndex = this.$data.nowAreaIndex;
            let mapArray = this.$data.mapArray;

            // 이미지를 갖고 인덱스 가져오기
            this.$data.mapArray.filter(function(arr){
                if( arr.img == nowAreaImg ){
                    nowAreaIndex = mapArray.findIndex( e => e.img == nowAreaImg)
                    if( nowAreaIndex !== -1 ){
                        return nowAreaIndex;
                    }
                }
            });

            // 마우스 오버, 클릭, 셀렉트 모두 적용 항목
            Vue.set(this.$data, 'nowAreaIndex', nowAreaIndex);
            Vue.set(this.$data, 'nowAreaImg', this.$data.mapArray[nowAreaIndex].img);

            // 마우스 오버가 아닐경우 가격까지 바꾸기!
            if( !over ){
                Vue.set(this.$data, 'selcAreaImg', this.$data.mapArray[nowAreaIndex].img);
                Vue.set(this.$data, 'nowAreaName', this.$data.mapArray[nowAreaIndex].name);
                Vue.set(this.$data, 'nowAreaSubsidy', this.$data.mapArray[nowAreaIndex].price);

                let priceLength = String(this.$data.mapArray[nowAreaIndex].price); // 문자열로 변환 된 가격
                let pricetxtArray = []; //가격 한 글자씩 떼온 것을 담을 배열
                let priceletter = 0;

                // 천자리 콤마
                if( this.$data.mapArray[nowAreaIndex].price.length > 3 ){

                    for (var i = 0; i < priceLength.length; i++) {
                        priceletter = priceLength[i];
                        if( i == 0 ){
                            priceletter = priceLength[0].concat(',');
                        }
                        pricetxtArray.push(priceletter);
                    }
                    pricetxtArray = pricetxtArray.join('');
                    Vue.set(this.$data, 'nowAreaSubsidy', pricetxtArray);
                }

                // 최종 가격
                let purchasePrice = 1190 - this.$data.mapArray[this.$data.nowAreaIndex].price;
                Vue.set(this.$data, 'nowpurchasePrice', purchasePrice);
            }
        },
    },
});
