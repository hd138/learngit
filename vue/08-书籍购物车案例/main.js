const app = new Vue({
	el: '#app',
	data: {
		books: [
			{
				id: '1',
				name: '《算法导论》',
				date: '2006-9',
				price: '95.00',
				count: '1',
			},
			{
				id: '2',
				name: '《JavaScript权威指南》',
				date: '2006-6',
				price: '65.00',
				count: '1',
			},
			{
				id: '3',
				name: '《编程艺术》',
				date: '2016-9',
				price: '25.00',
				count: '1',
			},
			{
				id: '4',
				name: '《代码大全》',
				date: '2011-9',
				price: '165.00',
				count: '1',
			},
		],
	},
	methods: {
		// getFinalPrice(price){
		//   return '￥'+price.toFixed(2)
		// }
		decrement(index) {
			this.books[index].count--;
		},
		increment(index) {
			this.books[index].count++;
		},
		removeClick(index) {
			this.books.splice(index, 1);
		},
	},
	computed: {
		totalPrice() {
			// 1. 普通的for循环
			let totalPrice = 0;
			// for (let i = 0; i < this.books.length; i++) {
			// 	totalPrice += this.books[i].price * this.books[i].count;
			// }
			// return totalPrice;

			// 2. for (let i in this.books)
			// for (let i in this.books) {
			// 	totalPrice += this.books[i].price * this.books[i].count;
			// }
			// return totalPrice;

      // 3.for (let i of this.books)
      // for (let item of this.books) {
      //   totalPrice+=item.price*item.count
      // }
      // return totalPrice

      // 4. reduce
		},
	},
	filters: {
		showPrice(price) {
			// console.log('111', price);
			return '￥' + parseFloat(price).toFixed(2);
		},
	},
});
