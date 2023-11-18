import { shallowMount } from '@vue/test-utils'
import Calendar from '@/components/Calendar/Calendar.vue'
import { useEventsStore } from '@/stores/userEvents.js'

const store = useEventsStore()
store.isCopyMode = false

describe('Calendar', () => {
  it('correctly renders calendar controls', () => {
    const wrapper = shallowMount(Calendar)
    expect(wrapper.find("[data-test='controls']"))
  })

  it('emits date when a cell is clicked', async () => {
    const wrapper = shallowMount(Calendar)
    await wrapper.vm.$nextTick()
    const cell = wrapper.find('.calendar__cell')
    cell.trigger('click')
    expect(wrapper.emitted('getDate')).toBeTruthy()
  })
})