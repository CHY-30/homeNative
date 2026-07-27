import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from './footer';
import Header from './header';

interface PageLayoutProps {
  children: React.ReactNode; // 중단 영역 (FlatList, ScrollView, Custom View 등)
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 상단 컴포넌트 */}
      <Header />

      {/* 2. 중단 (오직 children만 위치하는 순수 영역) */}
      <View style={styles.body}>
        {children}
      </View>

      {/* 3. 하단 컴포넌트 */}
      <Footer />
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