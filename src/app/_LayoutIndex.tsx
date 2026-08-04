import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageLayoutProps {
  children: React.ReactNode; // 중단 영역 (FlatList, ScrollView, Custom View 등)
}

export default function PageLayout({ children }: PageLayoutProps) {
  
  const insets = useSafeAreaInsets();
  
  return (
    <>
    <StatusBar style="dark" animated={true} />
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top}}>

      <View style={styles.body}>
        {children}
      </View>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1, // 상단과 하단을 제외한 중단 전체 공간
  },
});