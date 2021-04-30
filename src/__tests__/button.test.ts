import { render } from '@testing-library/svelte'
import Button from '../views/components/button.svelte'

test('button - props', () => {
  const label = 'Click';
  const setLabel = 'New Label';
  const { getByText, component } = render(Button, { label });

  expect(() => getByText(label)).not.toThrow();

  component.label = setLabel;

  expect(() => getByText(setLabel)).not.toThrow();

  component.label = undefined;

  expect(() => getByText('undefined')).toThrow();

  component.label = null;

  expect(() => getByText('null')).toThrow();

  delete component.label;

  expect(() => getByText('null')).toThrow();
})

test('button - no prop', () => {
  const { container } = render(Button);
  expect(container.innerHTML).toBe('<div></div>')
})

test('button - false prop', () => {
  global.console.warn = jest.fn()
  const {container} = render(Button, { falseProp: false });
  expect(container.innerHTML).toBe('<div></div>')
  expect(console.warn).toBeCalled()
})
