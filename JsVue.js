const car  = (name, model, year, owner, phone, image) => ({name, model, year, owner, phone, image});

const cars  = [
    car('Ford', 'Focus', 2016, 'Max', '8(999)111-22-33',['https://www.ford-favorit.ru/upload/dws_resized/617x370/upload/dws_iblock/iblock/4c0/4c0fa0067adac95b0d4e66c1c97473c5.jpg','http://static.cartimes.ru/cache/625x404c/news/14410/main.jpg']),
    car('Ford', 'Mondeo', 2011, 'Kirill', '8(999)333-32-44',['https://www.major-ford.ru/images/gallery/colours/8.jpg']),
    car('Ford', 'Mustang', 1964, 'Roman', '8(999)555-66-77',['https://w-dog.ru/wallpapers/1/16/340613164626739.jpg']),
    car('Toyota', 'Camry', 2018, 'Alex', '8(999)376-89-90',['https://toyota-ua.com/uploads/media/dc_car_gallery/0001/12/thumb_11947_dc_car_gallery_slider.jpeg','https://www.avtovzglyad.ru/media/article/cam3.jpg.740x555_q85_box-131%2C0%2C1147%2C760_crop_detail_upscale.jpg'] )
]

new Vue({
    el:'#app',
    data:{
        cars: cars,
        car: cars[0],
        selectCarIndex:0,
        telephoneVisibility:false,
        search:'',
        modalVisibility: false,
        orderCars:[],
        arrImageCar:cars[0].image,
        imageCar: cars[0].image[0]
    }, 
    mounted() {
        if (localStorage.getItem('orderCars')) {
          try {
            this.orderCars = JSON.parse(localStorage.getItem('orderCars'));
          } catch(e) {
            localStorage.removeItem('orderCars');
          }
        }
      },
    methods:{
             selectCar(index) {
              this.car = cars[index];
              this.arrImageCar =this.filterCar[index].image;
              this.imageCar = this.arrImageCar[0];
              this.selectCarIndex = index;
            },
            addOrderCars() {
                this.modalVisibility = false;
                this.orderCars.push(this.car);
                this.saveOrderCars();
            },
            removeOrderCars(x) {
                this.orderCars.splice(x, 1);
                this.saveOrderCars();
            },
            saveOrderCars() {
                const parsed = JSON.stringify(this.orderCars);
                localStorage.setItem('orderCars', parsed);
            },
             previousSlide() {
                 let imageIndexCar = this.arrImageCar.indexOf(this.imageCar);
                 imageIndexCar = 0 == imageIndexCar ? this.arrImageCar.length-1:--imageIndexCar;
                 this.imageCar = this.arrImageCar[imageIndexCar];      
            },
            nextSlide() {
                let imageIndexCar = this.arrImageCar.indexOf(this.imageCar);
                imageIndexCar = this.arrImageCar.length - 1 > imageIndexCar ? ++imageIndexCar:0;
                this.imageCar = this.arrImageCar[imageIndexCar];      
           }
    },
     computed:{
        phoneBtText(){
            return this.telephoneVisibility ? 'Hide  Phone' : 'Show Phone'
            },
        filterCar(){
        return filtered = this.cars.filter(car => {
             return car.name.toLowerCase().indexOf(this.search.toLowerCase())>-1 
             || car.model.toLowerCase().indexOf(this.search.toLowerCase())>-1
            }) 
        }
            
    }
})