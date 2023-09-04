import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from '@/components/UI/Tabs/Tabs.vue'

test('Tabs', () => {
  expect(Tabs).toBeTruthy()

  const tabs = [{ id: 0, tabTitle: 'All', icon: 'folder' }]

  const wrapper = mount(Tabs, {
    props: {
      tabs: tabs,
    },
  })

  expect(wrapper.text()).toContain('All')
})