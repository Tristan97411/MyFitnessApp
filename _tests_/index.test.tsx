import { render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';

test('HomeScreen affiche un message', () => {
  const { getByText } = render(<HomeScreen />);
  expect(getByText(/Bienvenue sur MyFitness App/i)).toBeTruthy();
});
