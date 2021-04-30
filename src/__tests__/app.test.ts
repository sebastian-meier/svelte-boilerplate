import { render, screen, fireEvent } from '@testing-library/svelte'
import App from '../App.svelte'
import Menu from '../views/components/menu.svelte'

test('should render - app', () => {
  const results = render(App, {})
  expect(() => results.getByText('Hello world!')).not.toThrow()
})

test('navigate to about', async () => {
  render(App, {})

  const aboutLink = screen.getByText("About");
  await fireEvent.click(aboutLink);

  await screen.findByText('About Page');
})

test('menu', async () => {
  const results = render(Menu, { menu: [{
    url: '/home',
    label: 'Home',
    protected: false
  }, {
    url: '/about',
    label: 'About',
    protected: false
  }]});
  
  expect(() => results.getByText('Home')).not.toThrow()

  const url = results.getAllByRole('link')[0].getAttribute('href')
  expect(url).toBe('#/home')

  const links = await screen.findAllByRole('link')
  expect(links).toHaveLength(2)

  const aboutLink = results.getByText('About')
  await fireEvent.click(aboutLink)

  const css = results.getByText('About').getAttribute('class')
  expect(css).toBe('active')
})
