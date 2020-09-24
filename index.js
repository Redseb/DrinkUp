import {AppRegistry, Platform} from 'react-native';
import App from './App';
import WebApp from './src/WebApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => WebApp);

// TODO(Bacon): When `expo` has removed Updates, replace this with using the `expo` entry for better error handling
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, {rootTag});
}

AppRegistry.registerComponent(appName, () => App);
