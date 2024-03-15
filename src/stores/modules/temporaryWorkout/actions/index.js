import { cloneDeep } from '@/helpers/cloneDeep.js'

const actions = {
  saveToLocalStorage() {
    localStorage.setItem('temporaryWorkout', JSON.stringify(this.temporaryWorkout))
  },
  loadFromLocalStorage() {
    this.temporaryWorkout = cloneDeep(JSON.parse(localStorage.getItem('temporaryWorkout')))
  },
  clearLocalStorage() {
    localStorage.removeItem('temporaryWorkout')
    localStorage.removeItem('startTime')
    this.temporaryWorkout = null
  }
}

export default actions