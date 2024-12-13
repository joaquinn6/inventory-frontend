import { defineStore } from 'pinia'
import { saleService } from '@/services'

export const saleStore = defineStore('saleStore', {
  state: () => ({
    list: null,
    entity: null,
    error: null,
    create: null,
    filters: {
      date: [],
      customer: '',
      pay_types: '',
      amount: [0, 5000],
    },
    paginator: {
      limit: 20,
      page: 1,
      total: 0,
    },
  }),
  actions: {
    getSales(query) {
      saleService
        .getSales(query, this.paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getSaleById(idSale) {
      saleService
        .getSaleById(idSale)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createSale(body) {
      saleService
        .createSale(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
  },
})
