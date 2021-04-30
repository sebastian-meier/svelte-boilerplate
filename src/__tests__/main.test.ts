import { screen } from '@testing-library/svelte'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from '../App.svelte'
import main from '../main'

test('should render - app', () => {
  main
  expect(() => screen.getByText('Hello world!')).not.toThrow()
})