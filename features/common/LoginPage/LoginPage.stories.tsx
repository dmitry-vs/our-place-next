import React from 'react';
import LoginPage from './LoginPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';

export default {
  component: LoginPage,
  title: 'Pages/LoginPage',
} as ComponentMeta<typeof LoginPage>;

export const Example: ComponentStory<typeof LoginPage> = (args) => (
  <Provider store={createAppStore()}>
    <LoginPage {...args} />
  </Provider>
);
