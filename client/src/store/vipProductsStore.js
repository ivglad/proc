import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useVipProductsStore = defineStore('vipProductsStore', () => {
  const products = ref([
    {
      id: 1,
      title: 'Тарт со свежими ягодами и сырным парфе',
      description: '',
      portion: '40г',
      price: 90,
      quantity: 0,
      img: '',
    },
    {
      id: 2,
      title: 'Сырники с сыром дор блю и грушей',
      description: '',
      portion: '90г',
      price: 110,
      quantity: 0,
      img: '',
    },
    {
      id: 3,
      title: 'Боул ягодно-фруктовый',
      description: '',
      portion: '50г',
      price: 50,
      quantity: 0,
      img: '',
    },
    {
      id: 4,
      title: 'Соус сладкий чили',
      description: '',
      portion: '450г',
      price: 150,
      quantity: 0,
      img: '',
    },
  ])

  return { products }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVipProductsStore, import.meta.hot))
}
