import React from 'react';
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

interface AppTextProps extends RNTextProps {
  size?: number;
  color?: string;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default function AppText({
  size = 16,
  color = '#1e293b',
  weight = 'normal',
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <RNText style={[{ fontSize: size, color: color, fontWeight: weight }, style]} {...props}>
      {children}
    </RNText>
  );
}