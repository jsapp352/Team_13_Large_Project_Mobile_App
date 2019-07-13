/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import WaitList from './WaitList';
import React from 'react';
import TabNavigator from './TabNavigator'
import Student from './Student'
import theme from 'leaf-ui/theme/native';
import Text from 'leaf-ui/Text/native';
import Card from 'leaf-ui/Card/native';
import Space from 'leaf-ui/Space/native';
import Flex from 'leaf-ui/Flex/native';
import ExampleBanner from './ExampleBanner'

AppRegistry.registerComponent(appName, () => ExampleBanner);
// AppRegistry.registerComponent(appName, () => Header);
