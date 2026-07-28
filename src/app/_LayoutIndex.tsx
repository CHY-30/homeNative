import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PageLayoutProps {
  children: React.ReactNode; // 중단 영역 (FlatList, ScrollView, Custom View 등)
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.body}>
        {children}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1, // 상단과 하단을 제외한 중단 전체 공간
  },
});