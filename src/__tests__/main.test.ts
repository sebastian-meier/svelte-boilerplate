import { screen } from '@testing-library/svelte'
import App from '../App.svelte'
import main from '../main'

test('should render - app', () => {
  main
  expect(() => screen.getByText('Hello world!')).not.toThrow()
})