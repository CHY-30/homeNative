import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/textAll';

interface PageLayoutProps {
  children: React.ReactNode; // 중단 영역 (FlatList, ScrollView, Custom View 등)
  title: string;
  leftAction:{onPress: () => void};
}

export default function PageLayout({ children, title, leftAction}: PageLayoutProps) {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={leftAction.onPress}>
          <AppText size={20} weight="bold" color="#555555" style={{ marginLeft: 8 }}>{title}</AppText>
        </TouchableOpacity>
      </View>

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
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  body: {
    flex: 1, // 상단과 하단을 제외한 중단 전체 공간
    paddingBottom:70,
  },
});