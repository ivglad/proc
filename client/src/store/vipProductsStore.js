import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useVipProductsStore = defineStore('vipProductsStore', () => {
  const products = ref([
    {
      id: 1,
      title: 'Тарт со свежими ягодами и сырным парфе',
      description:
        'Деликатный и нежный десерт со свежими ягодами. Вы можете взять клубнику, малину, чернику, голубику и даже апельсины, лишь очистив дольки от пленочек. Или создайте ягодный микс, как в моем случае.',
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
      price: '',
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
      description:
        'Он популярен в качестве соуса к блюдам европейской и китайской кухни, таким как тосты с креветками, яичные рулетики, обертывания из листьев салата, куриные крылышки и спринг-роллы.',
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
