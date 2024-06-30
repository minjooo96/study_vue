
Vue.component('list', {
    props: ['citem', 'cindex'],
    template: `
        <div class="item">
            <div class="check">
                <input type="checkbox" :id="citem.id" name="" :value="citem.name" v-model="citem.selected">
                <label :for="citem.id">
                    <span class="pd_name">{{ citem.name }}</span>
                    <span class="pd_price">{{ cinputPrice }}</span>
                    <span class="pd_price">{{ cinputResult }}</span>
                </label>
            </div>
            <div class="pd_amount">
                <button type="button" name="button" @click="compListCountBtn(0, cindex)">-</button>
                <input type="text" name="" class="num" v-model.number="cinputCount">
                <button type="button" name="button" @click="compListCountBtn(1, cindex)">+</button>
                <button type="button" name="button" class="big del" @click="compListBtn(0, cindex)">삭제</button>
            </div>
        </div>
    `,
    data: function(){
        return{
            cinputCount: this.citem.count,
            cinputPrice: this.citem.price.toLocaleString(),
            cinputResult: (this.citem.count * this.citem.price).toLocaleString(),
        }
    },
    methods: {
        compListCountBtn: function(count, index){
            count ? this.cinputCount++ : this.cinputCount--;
            this.$emit('clistcount', count, index);
        },
        compListBtn: function(count, index){
            this.$emit('clistbtn', count, index);
        },
    },
    watch: {
        cinputCount: function(){
            Vue.set(this.citem, 'count', this.cinputCount);

            if( this.cinputCount == null || this.cinputCount == '' ){
                alert('개수를 입력해주세요.');
                this.cinputCount = 1;

                return;
            }else if( typeof this.cinputCount !== 'number' ){
                alert('개수는 숫자로 입력해주세요.');
                this.cinputCount = 1;

                return;
            }else if( this.cinputCount > 99 ){
                alert('상품은 99개까지 등록할 수 있습니다.');
                this.cinputCount = 1;

                return;
            }
            Vue.set(this, 'cinputPrice', Number(this.cinputPrice.replace(',', '')));
            Vue.set(this, 'cinputResult', Number(this.cinputResult.replace(',', '')));
            Vue.set(this, 'cinputResult', (this.cinputCount * this.cinputPrice).toLocaleString());
            Vue.set(this, 'cinputPrice', this.cinputPrice.toLocaleString());
        },
    },
})

const app = new Vue({
    el: '.cart-box',
    data: {
        listLength: true,
        inputName: null,
        inputCount: 1,
        inputPrice: null,
        allSelected: true,
        listArray: [
            { id: 'pd01', name: '사탕', price: 100000, count: 1, selected: true },
            // { id: 'pd02', name: '과자', price: 30000, count: 1, selected: true },
            // { id: 'pd03', name: '껌', price: 700, count: 1, selected: true }
        ]
    },
    methods: {
        allDelete: function(){ // 전체 삭제
            this.$data.listArray = [];
        },
        allSelectedFn: function(){ // 전체 선택
            for (var i = 0; i < this.$data.listArray.length; i++) {
                this.$data.listArray[i].selected = this.$data.allSelected;
            }
        },
        inputCountBtn: function(count){ // 등록하는 입력 칸의 갯수 조절
            if( count == 0 && this.$data.inputCount == 0 ) return;

            if( count ){ // 플러스
                Vue.set(this.$data, 'inputCount', ++this.$data.inputCount);
            }else{ // 마이너스
                Vue.set(this.$data, 'inputCount', --this.$data.inputCount);
            }
        },
        listCountBtn: function(count, index){ // 등록된 상품 리스트의 갯수 조절
            if( count == 0 && this.$data.listArray[index].count == 0 ) return;

            if( count ){ // 플러스
                Vue.set(this.$data.listArray[index], 'count', ++this.$data.listArray[index].count);
            }else{ // 마이너스
                Vue.set(this.$data.listArray[index], 'count', --this.$data.listArray[index].count);
            }
        },
        listBtn: function(kinds, index){ // 추가 삭제 버튼
            let $data = this.$data;
            let focusEl = document.querySelectorAll('.box.input')[0].children;

            if( kinds ){ // 추가
                if( $data.inputName == null || $data.inputName == '' ){
                    alert('상품명을 입력해주세요.');
                    focusEl[0].children[0].focus();

                    return;
                }else if( $data.inputPrice == null || $data.inputPrice == '' ){
                    alert('가격을 입력해주세요.');
                    focusEl[1].children[0].focus();

                    return;
                }else if( typeof $data.inputPrice !== 'number' ){
                    alert('가격은 숫자로 입력해주세요.');
                    focusEl[1].children[0].focus();
                    $data.inputPrice = 1;

                    return;
                }else if( $data.inputCount == null || $data.inputCount == '' ){
                    alert('개수를 입력해주세요.');
                    focusEl[2].children[1].focus();

                    return;
                }else if( typeof $data.inputCount !== 'number' ){
                    alert('개수는 숫자로 입력해주세요.');
                    focusEl[2].children[1].focus();
                    $data.inputCount = 1;

                    return;
                }

                let inputArray = { name: $data.inputName, price: $data.inputPrice, count: $data.inputCount, selected: true };
                Vue.set($data.listArray, $data.listArray.length, inputArray);
            }else{ // 삭제
                $data.listArray.splice(index, 1);
            }
        }
    },
    updated: function(){
        // 전체 선택
        let $data = this.$data;
        let ind = [];

        $data.listArray.forEach(function(item, i){
            if( $data.listArray[i].selected ){ ind.push($data.listArray[i].selected); }
        });

        ind.length == $data.listArray.length ? $data.allSelected = true : $data.allSelected = false;
    },
    watch: {
        inputCount: function(){
            if( this.$data.inputCount > 99 ){
                alert('상품은 99개까지 등록할 수 있습니다.');
                this.$data.inputCount = 1;
            }
        },
        listArray: function(){
            // 상품을 등록해주세요 노출
            this.$data.listArray.length > 0 ? this.$data.listLength = true : this.$data.listLength = false;
        }
    },
    computed: {
        resultCount: function(){ // 총 갯수
            let $data = this.$data;
            let result = 0;
            for (var i = 0; i < $data.listArray.length; i++) {
                if( $data.listArray[i].selected ){
                    let c = $data.listArray[i].count;
                    result += Number(c);
                }
            }
            return result;
        },
        resultPrice: function(){ // 총 가격
            let $data = this.$data;
            let result = 0;
            for (var i = 0; i < $data.listArray.length; i++) {
                if( $data.listArray[i].selected ){
                    let p = $data.listArray[i].price * $data.listArray[i].count;
                    result += p;
                }
            }

            // 천자리 콤마
            let priceLength = String(result); // 문자열로 변환 된 가격
            let pricetxtArray = []; //가격 한 글자씩 떼온 것을 담을 배열
            let priceletter = 0; // 가격 한 글자씩 떼온 것
            let remain = priceLength.length % 3; // 가격 자릿수에서 3을 나눈 나머지
            if( priceLength.length > 3 ){
                for (var i = 0; i < priceLength.length; i++) {
                    priceletter = priceLength[i];

                    if( remain == 0 ){ remain = 3; }
                    if( i == remain-1 ){
                        if( remain !== priceLength.length ){
                            priceletter = priceLength[remain-1].concat(',');
                            remain += 3;
                        }
                    }
                    pricetxtArray.push(priceletter);
                }
                pricetxtArray = pricetxtArray.join('');
                result = pricetxtArray;
            }
            return result;
        },
    }
});
