import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';
import loadingLottie from '@assets/animations/lottie-loading.json';
import { Lottie } from '../Lottie';

export function Load() {
  const theme = useTheme();

  return (
    <Lottie source={loadingLottie} />
    // <ActivityIndicator
    //   color={theme.COLORS.PRIMARY}
    //   style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    // />
  );
}