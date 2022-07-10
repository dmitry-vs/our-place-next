import React from 'react';
import MainPage from './MainPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';

export default {
  component: MainPage,
  title: 'Pages/MainPage',
} as ComponentMeta<typeof MainPage>;

export const Example: ComponentStory<typeof MainPage> = (args) => (
  <Provider store={createAppStore({ auth: { userName: 'Test User' } })}>
    <MainPage {...args} />
  </Provider>
);
