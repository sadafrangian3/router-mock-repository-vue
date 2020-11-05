import { routeLocationKey, routerKey } from '../src'
import { config, mount } from '@vue/test-utils'
import Test from './fixtures/Test'
import { RouterLink } from 'vue-router'
// import { createRouter, createMemoryHistory } from "vue-router";

// const router = createRouter({
//   history: createMemoryHistory(),
//   routes: [{
//     path: '/:pathMatch(.*)*',
//     component: { render: () => null }
//   }]
// })

config.global.components = config.global.components || {}
config.global.components.RouterLink = RouterLink

describe('Component', () => {
  const routerMock = {
    push: jest.fn(),
  }
  const routeMock = {
    fullPath: 'fullPath',
  }

  beforeAll(() => {
    // @ts-ignore
    config.global.provide = { foo: 'foo' }
    // shouldn't this be always present for convenience?
    // record string is not enough
    config.global.provide![routerKey as any] = routerMock
    config.global.provide![routeLocationKey as any] = routeMock
  })

  it('works', async () => {
    const wrapper = mount(Test, {
      // initial location
      // route: '/',
      // router: false,
    })

    // await wrapper.pendingNavigation()

    expect(wrapper.vm.foo).toBe('foo')

    expect(wrapper.text()).toBe(`fullPath`)
    expect(wrapper.vm.router).toBe(routerMock)
    expect(wrapper.vm.$router).toBe(routerMock)

    // sugar
    // expect('/url').toBeCurrentRoute()
    // expect('/url').toBeCurrentRoute()
    // expect('/url').toHaveBeenRedirectedTo()
  })
})
