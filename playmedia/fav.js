

let basket = new Vue({
  el: "#bsk",
  data: {
    items: [],
    storagename: '_local_basket_',
    sendWindow: false,
    name: '',
    email: '',
    phone: '',
    bannerContent: '',
    bannerStatus: false,
    outputLink: null },

  methods: {
    changeStorage(type, id) {
      if (type === "add") {
        this.items.forEach(item => {
          if (item.id === id) {
            item.amount = item.amount += 1;
          }
        });
      } else if (type === "delete") {
        this.items = this.items.filter(item => item.id !== id);
      } else if (type === 'count_down') {
        this.items.forEach(item => {
          if (item.id === id) {
            if (item.amount > 0) {
              item.amount -= 1;
            }
          }
        });
      }
      this.localStorageActions();
    },
    getDB() {
      this.items = JSON.parse(localStorage.getItem('_local_basket_')) || [];
    },
    setBasketAmount(element) {
      this.outputLink = element;
    },
    setAmount() {
      this.outputLink.innerHTML = `( ${this.items.length} )`;
    },
    localStorageActions() {
      localStorage.removeItem(this.storagename);
      let sendData = JSON.stringify(this.items);
      localStorage.setItem(this.storagename, sendData);
    },
    minMeth(id) {
      this.changeStorage('count_down', id);
    },
    maxMeth(id) {
      this.changeStorage('add', id);
    },
    delMeth(id) {
      this.changeStorage('delete', id);
      this.setAmount();
    },
    toggleSendWindow() {
      this.sendWindow = !this.sendWindow;
    },
    sendOrder() {
      let order = {
        items: this.items,
        totals: this.getTotal(),
        self: {
          name: this.name,
          email: this.email,
          phone: this.phone } };


      this.banner('You order send!');
      if (order.self.name && order.self.email && order.self.phone) {
        //alert('And now AXIOS time!!!!')
      }
    },
    banner(content) {
      this.bannerContent = content;
      this.bannerStatus = true;
      setTimeout(() => {this.bannerStatus = false;}, 1000);
    },
    getTotal() {
      let output = { w: 0, p: 0 };
      this.items.forEach(item => {
        output.w += +item.weight * +item.amount;
        output.p += +item.price * +item.amount;
      });
      return output;
    } },

  created() {
    this.items = JSON.parse(localStorage.getItem('_local_basket_')) || [];
    this.setAmount();
  },
  mounted() {

  },
  computed: {
    getTotalValues() {
      let output = { w: 0, p: 0 };
      this.items.forEach(item => {
        output.w += +item.weight * +item.amount;
        output.p += +item.price * +item.amount;
      });
      return output;
    },
    emptyArray() {
      return this.items.length === 0 ? true : false;
    } } });



class BasketComponent {
  constructor() {
    this.namespace = 'basket-component';
    this.storagename = '_local_basket_';
    this.addClasses = ['card-item__add-button'];
    this.toggleBasketElement = document.querySelector('.basket-toggle');
    this.basket = document.querySelector(`.${this.namespace}`);
    this.counter = document.querySelector('.basket-toggle__counter');

    this.init();
  }
  toggleBasket() {
    this.toggleBasketElement.addEventListener('click', () => {
      this.basket.classList.toggle('basket-component--isActive');
    });
  }
  setControllers() {
    let elements = [];
    this.addClasses.forEach(v => {
      let e = document.querySelectorAll(`.${v}`);
      elements = [...elements, ...e];
    });
    elements.forEach(element => {
      element.addEventListener('click', e => {
        let currentDataClick = {
          "id": e.target.getAttribute('data-item-id'),
          href: e.target.getAttribute("data-item-href"),
          "img": e.target.getAttribute('data-item-img'),
          "name": e.target.getAttribute('data-item-name'),
          "weight": e.target.getAttribute('data-item-weight'),
          "price": e.target.getAttribute('data-item-price'),
          "amount": 1 };

        this.localStorageActions('add', currentDataClick);
        basket.getDB();
        this.counter.textContent = `( ${JSON.parse(localStorage.getItem('_local_basket_')).length} )`;
      });
    });
  }
  outputLink() {
    return this.counter;
  }
  localStorageActions(type, value, storage_data_base) {

    let data = JSON.parse(localStorage.getItem(this.storagename)) || [],
    middleValue = '',
    sendData = '';

    function isContain() {
      if (data.length !== 0) {
        return data.find(v => v.id === value.id);
      }
      return false;
    }

    let filterElements = data.filter(element => value.id !== element.id);
    let findElement = data.find(element => value.id === element.id);

    if (type === 'add') {
      if (isContain()) {
        let currentAmount = +findElement.amount;
        currentAmount += 1;
        let fe = { ...findElement, amount: currentAmount };
        middleValue = [...filterElements, fe];
      } else
      {
        middleValue = [...data, value];
      }
    }
    sendData = JSON.stringify(middleValue);
    localStorage.setItem(this.storagename, sendData);
  }
  initBasketLength() {
    let bsk = JSON.parse(localStorage.getItem('_local_basket_'));
    this.counter.textContent = `( ${bsk ? bsk.length : 0} )`;
  }
  init() {
    this.toggleBasket();
    this.setControllers();
    this.initBasketLength();
  }}


let _basket = new BasketComponent();

basket.setBasketAmount(_basket.outputLink());


