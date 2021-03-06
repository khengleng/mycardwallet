import {
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  position,
  PositionProps,
  border,
  BorderProps,
  backgroundColor,
  BackgroundColorProps,
} from '@shopify/restyle';
import { ReactNode } from 'react';
import {
  SafeAreaView as ReactNativeSafeAreaView,
  ViewProps,
} from 'react-native';

import { Theme } from '../../theme';

type RestyleProps = ViewProps &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  PositionProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme>;

export interface SafeAreaViewProps extends RestyleProps {
  children: ReactNode;
}

/**
 * This is our primitive SafeAreaView component with restyle props applied
 */
export const SafeAreaView = createRestyleComponent<SafeAreaViewProps, Theme>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  [layout, spacing, position, border, backgroundColor],
  ReactNativeSafeAreaView
);
