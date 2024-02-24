import ProductDetailModal from "./components/ProductDetailModal.js";

const { createApp } = Vue;

// 從 VeeValidate 取出需要的方法和元件，這樣 js 才會認得這些語法
// defineRules 用來定義規則
// configure 用來設定訊息產生的語系還有驗證觸發的時機
const { defineRule, configure, Form, Field, ErrorMessage } = VeeValidate;
// 從 VeeVlidateRules 取出規則，這樣才可以使用這些 attributes
const { required, email, max, min } = VeeValidateRules;
// 從 VeeValidateI18n 取出讀取外部資源的方法 
// loadLocaleFromURL，從URL載入 locale (=語言環境)，他可以取得繁體中文的JSON物件
// localize 可以指定訊息產生時要吃哪一種語系包
const { loadLocaleFromURL, localize } = VeeValidateI18n;

// 定義規則之後就可以使用標籤
defineRule('required', required);
defineRule('email', email);
defineRule('max', max);
defineRule('min', min);

// 取得繁中語系包
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.0.2/dist/locale/zh_TW.json');

// 全域設定驗證環境
configure({
    generateMessage: localize('zh_TW'),
    validateOnBlur: true,
});

// let productDetailModal = null;

const app = createApp({
    data() {
        return {
            // 控制 sping icon 的開關
            // loadingItem 要放入的是產品的 id
            loadingStatus: {
                loadingItem: '',
                addingItem:'',
                deleteCartItem:'',
            },
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath: 'chrissqr',
            products: [],
            product: {},
            cart: {},
            // qtyToAdd: 1,
            formInfo: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
        }
    },
    // 區域註冊
    components:{
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
        ProductDetailModal,
    },
    methods: {
        getProducts() {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/products`;
            axios.get(url)
                .then((response) => {
                    this.products = response.data.products;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
        getProduct(id) {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/product/${id}`;
            this.loadingStatus.loadingItem = id;
            axios.get(url)
                .then((response) => {
                    this.loadingStatus.loadingItem = '';
                    this.product = response.data.product;
                    // productDetailModal 在app mounted 的時候被實例化
                    // productDetailModal.show();
                    this.$refs.productDetailModal.openModal();
                })
                .catch((error) => {
                    alert(error.response);
                });
        },
        getCart() {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
            axios.get(url)
                .then((response) => {
                    this.cart = response.data.data;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
        addToCart(id, qty=1) {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
            //需要送物件出去，按照 api 的資料結構組裝
            const cart = {
                data: {
                    product_id: id,
                    qty,
                },
            };
            // 切換 loading 狀態
            this.loadingStatus.addingItem = id;

            // 關掉 modal
            // productDetailModal.hide();
            this.$refs.productDetailModal.closeModal();

            axios.post(url, cart)
                .then((response) => {
                    //切換 loading 狀態
                    this.loadingStatus.addingItem = '';
                    alert(response.data.message);
                    this.getCart();
                    this.qtyToAdd = 1;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
        deleteCartItem(id) {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${id}`;
            this.loadingStatus.deleteCartItem = id;
            axios.delete(url)
                .then((response) => {
                    this.loadingStatus.deleteCartItem = '';
                    alert(response.data.message);
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        deleteAllCarts() {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/carts`;
            axios.delete(url)
                .then((response) => {
                    alert(response.data.message);
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        updateItemAmount(itemInCarts) {
            // /v2/api/{api_path}/cart/{id}
            // 要給 carts item id
            // 要給 更新數量的商品物件 updateItem
            // {
            //    "data": {
            //        "qty": 1
            //        "product_id": "-L9tH8jxVb2Ka_DYPwng",
            //    }
            // }
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${itemInCarts.id}`;
            const cart = {
                data: {
                    product_id: itemInCarts.product_id,
                    qty: itemInCarts.qty,
                },
            };
            axios.put(url, cart)
                .then((response) => {
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
        
        cleanForm() {
            this.formInfo = {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            }
        },
        submitOrder() {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/order`;
            const data = {
                data: this.formInfo,
            };

            axios.post(url, data)
                .then((response) => {
                    alert(response.data.message);
                    // 透過 $refs 找到 ref="form"的表單，清空他
                    // textarea 不為所動，WHY??
                    this.$refs.form.resetForm();
                    this.cleanForm();
                    // 遠端的購物車已經空了，再取得一次，讓畫面也顯示空的購物車
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        }

    },
    mounted() {
        this.getProducts();
        this.getCart();
        // productDetailModal = new bootstrap.Modal(document.querySelector('#productDetailModal'));
    },
});
// 全域註冊
// app.component('VForm', VeeValidate.Form);
// app.component('VField', VeeValidate.Field);
// app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');
