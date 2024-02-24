export default {
    props: {
        product: {
            //大括號內指定驗證和預設值
            type: Object,
            default() {
                return {

                }
            },
        },
    },
    data() {
        return {
            qtyToAdd:1,
            modal:'',
        }
    },
    methods: {
       openModal(){
        this.modal.show();
       },
       closeModal(){
        this.modal.hide();
        this.qtyToAdd = 1;
       }
    },
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal,{
            keybord: false,
            backdrop: 'static',
        });
    },
    template: '#productDetailModal',
}