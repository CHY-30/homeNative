import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false, // 기본 네이티브 헤더 숨김
            contentStyle: { backgroundColor: '#FFFFFF' }, // 스크린 기본 배경 흰색
          }}
        />
      </SafeAreaProvider>
    </View>
  );
}