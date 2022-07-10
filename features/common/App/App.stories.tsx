import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';
import { getStateFromLocalStorage } from '../utils';

export default {
  title: 'General/App',
  component: App,
} as ComponentMeta<typeof App>;

export const Example: ComponentStory<typeof App> = (
  args,
  { loaded: { initialState } }
) => (
  <Provider store={createAppStore(initialState || undefined)}>
    <App {...args} />
  </Provider>
);

Example.loaders = [
  async () => ({
    initialState: await getStateFromLocalStorage(),
  }),
];
