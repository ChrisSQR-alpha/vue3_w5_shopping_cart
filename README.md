# vue3_w5_shopping_cart

撰寫流程
===
Vue 第五週作業

環境建置

1. Git repository build and clone <br>
2.  打開資料夾建立index.html index.js <br>
3. 貼上 html 模板 v
4. Vue3 以 global 注入 v
5. 挑選要插入的 CDN  bootstrap css 5.3.2 fontawsome css 5.9.0 axios 1.1.2 bootstrap script 5.3.2 vue3  vee-validate <br>
6. 建立style sheet script 連結，style sheet 放在 head <br>
7. 去 index.js 建立 vue app 的結構 ( global cdn、解構、賦予實例)<br>
8. 測試vue 環境可以做動 <br>
9. 觀看版型瞭解要做什麼事 <br>
10. 針對要做的事情查詢 api ，確認要呼叫哪幾支以及資料結構長怎樣 <br>
11. 區分版型區塊 (1) 產品列表 (2) 詳細資料Modal component (3) 購物車清單 (4) 使用者資料 <br>
12. 製作產品列表 (1) 貼上板型  (2) 製作 getProducs 方法 [method 與 api 方法及名稱搭配 (3) 建立對應的 data() properties  (4) 生命週期內呼叫 產品列表 API 確認渲染正常 (5) 補上 html 內欠缺的 vue 指令 <br>
13. 製作取得購物車方法 (1) 貼上版型 (2) 製作 getCart 方法 (3) 建立對應的 data() properties (4) 生命週期內呼叫  購物車列表 API 確認渲染正常 (5) 補上 html 內欠缺的 vue 指令 <br>
14. 製作加到購物車方法 理解行為： 按了加入購物車按鈕之後 將 id 和 數量組合成物件 post 出去 (1) 製作 addToCart 方法 (2) 建立html 加入購物車的觸發vue指令，配合item.id (3) 在 addToCart 裡面組裝要post 出去的物件  <br>
15. 製作刪除單項商品方法v (1)製作 deleteCartItem 方法 (2) 去 html 刪除單品項按鈕的位置，加上 v-on:click 事件觸發這個方法 (3) getCart() 渲染更新後的購物車列表 <br>
16. 製作刪除全部商品方法v (1) 製作 deleteAllCarts 方法 (2) 去 html 刪除單品項按鈕的位置，加上 v-on:click 事件觸發這個方法 (3) getCart() 渲染更新後的購物車列表 <br>
17. 製作修改商品數量方法v (1) 製作 updateItemAmount 方法 (2) 建立html 加入購物車的觸發vue指令       以 blur 事件觸發方法，並把 item 送給方法       item 是 cart.carts 陣列裡面的物件 (3) 在 updateItemAmount 裡面組裝要put 出去的物件<br>
18. 製作優惠券方法（需要瞭解一下功能） 沒有優惠代碼輸入介面 所以讓已套用優惠隱藏吧! (1) 查看 cart 的資料結構，找出優惠價和折扣價的位置 (2) 去 html 補上指令，判斷是否要顯示優惠相關字樣<br>
19. 處理查看更多按鈕觸發的詳細資料 modal (1) 找一個 BS5的 modal 版型 (2) 修改 layout [input+button = input group] (3) 實作getProduct(id) (4) 實作開啟 modal  [宣告變數、實例化、.show()] (5) 去html 補上觸發 getProcut(id) 的指令 (6) 增加 {{ }} 欄位值 (7) 去 js 增加 新增數量 的欄位 (8) 去 html 增加 input 和 qtyToAdd 欄位的關係 (9) 新增按鈕觸發事件與呼叫的方法 (10) 新增 .hide() BS 方法到 addToCart() 關掉modal (11) 當 addToCart() axios post 成功之後，qtyToAdd 改回1 <br>
20. 表單驗證 VeeValidate (1) 在自訂app <script> 前插入 3 個 VeeValidate CDN (2) 在 index.js 全域註冊元件 V-Form, V-Field, ErrorMessage (3) 貼上表單版型，確認可顯示 (4) 解構需要import 的元件、方法、屬性物件 (5) 定義驗證方法   (6) 載入語系包 JSON (7) 設定驗證環境：訊息產生語系、觸發驗證時機 (8) 查看送出資料表單 API 資料結構 v (9) 建立資料表單資料結構 v (10) v-model 連結輸入與資料值 v (12) 建立送出資料表單資料方法 (13) 去v-form 和 button建立送出資料表單指令 (14) getCart() 取得空的購物車 (15) this.$refs.form.resetForm(); 讓表單恢復前一動         textarea 不為所動 (16) 手動打造一個清空表單 data 資料的方法 <br>
21. 製作讀取效果 fontawesome (1) 建立 loadinStatus 資料結構 (2)利用loadingStatus 內的自訂屬性、商品是否啟用       建立按鈕啟動或不啟動機制 (3) 利用 loadingStatus 內的自訂屬性狀態轉換，控制        fontawesome 動態 icon 是否要顯示 <br>
22. 購物車內沒有東西時不disable 清空購物車和送出訂單 (1) :disabled=“cart.total === 0” <br>
23. 將 productDetailModal 元件化 (1) 建立 ProductDetailModal 元件檔案 export default (2) 子元件 import 到根元件 (3) 子元件區域註冊到根元件  (4) 勇敢貼上template，並指定 product-detail-modal 渲染位置 (5) 檢查錯誤訊息，把 props:{product}傳進去，       並驗證型別 type:Object 預設值：空物件 (6) 根據錯誤把需要的 data 屬性送進去       接著發現 modal 點開資料沒有讀進去       於是在 modal 渲染位置 v-bind props 溝通管道 (7) 點擊 modal 內的 button 發現會出錯       因為新增產品到購物車的方法在外層       所以我要新增一個 $emit  事件 (8) 觸發事件起點在 template，       v-on:click=“$emit(‘add-to-cart’, product.id, qtyToAdd)” (9) 渲染位置建構 emit 管道，觸發外層方法       @add-to-cart=“addToCart” <br>
24. Modal 關掉之後要重置數量，把實體放到子元件裡面 (1) 新增一個方法 將數量重置，並放到 closeModal 裡面 (2) 把 BS-close 方法換成自訂義的關閉方法 (3) 原本抓 DOM的方法改成抓ref的方法       <br>

