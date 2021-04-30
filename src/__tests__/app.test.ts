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
  const homeUrl = '/';
  const homeLabel = 'Home';

  const aboutUrl = '/about';
  const aboutLabel = 'About';

  const menu = [{
    url: homeUrl,
    label: homeLabel
  }, {
    url: aboutUrl,
    label: aboutLabel
  }]

  const { container, getByText, findAllByRole, component } = render(Menu, { menu });

  container.querySelectorAll('ul li a').forEach((a, ai) => {
    expect(a).toHaveProperty('href', 'http://localhost/#' + menu[ai].url)
    expect(a.innerHTML).toBe(menu[ai].label)
  })

  expect(component.menu).toBe(menu)

  const links = await findAllByRole('link')
  expect(links).toHaveLength(menu.length)
  menu.forEach((m, mi) => {
    expect(() => getByText(m.label)).not.toThrow()
    expect(links[mi].innerHTML).toBe(m.label)
    expect(links[mi].getAttribute('href')).toBe('#' + m.url)
  });

  const aboutLink = getByText(aboutLabel)
  await fireEvent.click(aboutLink)

  const css = getByText(aboutLabel).getAttribute('class')
  expect(css).toBe('active')
})

test('empty menu', () => {
  const menu = []
  const {container} = render(Menu, { menu });

  expect(container.innerHTML).toBe('<div><ul></ul></div>')
})
