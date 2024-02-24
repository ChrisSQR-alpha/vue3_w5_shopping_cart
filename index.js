const { createApp } = Vue;

let productDetailModal = null;


const app = createApp({
    data() {
        return {
            text: '測試文字',
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath: 'chrissqr',
            products: [],
            product:{},
            cart: {},
            qtyToAdd: 1,
        }
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
        getProduct(id){
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/product/${id}`;
            axios.get(url)
                .then((response) => {
                    //console.log(response.data.product);
                    this.product=response.data.product;
                    console.log(this.product);
                    // productDetailModal 在app mounted 的時候被實例化
                    productDetailModal.show();
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
                    console.log(response.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        addToCart(id, qty = 1) {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
            //需要送物件出去，按照 api 的資料結構組裝
            const cart = {
                data: {
                    product_id: id,
                    qty,
                },
            };

            // 關掉 modal
            productDetailModal.hide();

            axios.post(url, cart)
                .then((response) => {
                    console.log(response.data);
                    this.getCart();
                    this.qtyToAdd = 1;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        deleteCartItem(id) {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${id}`;
            axios.delete(url)
                .then((response) => {
                    console.log(response.data.message);
                    this.getCart();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                })
        },
        deleteAllCarts() {
            const url = `${this.apiUrl}/v2/api/${this.apiPath}/carts`;
            axios.delete(url)
                .then((response) => {
                    console.log(response.data.message);
                    this.getCart();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
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
                    console.log(response.data);
                    this.getCart();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
        
    },
    mounted() {
        this.getProducts();
        this.getCart();
        productDetailModal = new bootstrap.Modal(document.querySelector('#productDetailModal'));
    },
});

app.mount('#app');
