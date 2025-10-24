import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/presentation/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

export default App;