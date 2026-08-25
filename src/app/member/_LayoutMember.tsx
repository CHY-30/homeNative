import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../../components/textAll';


interface PageLayoutProps {
  children: React.ReactNode; // 중단 영역 (FlatList, ScrollView, Custom View 등)
  title: string;
  leftAction:{onPress: () => void};
}

export default function PageLayout({ children, title, leftAction}: PageLayoutProps) {

  const insets = useSafeAreaInsets();
  
  return (
    <>
    <StatusBar style="dark" animated={true} />
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      <View style={styles.container}> 
      
        <View style={styles.header}>
          <TouchableOpacity onPress={leftAction.onPress}>
            <AppText size={20} weight="bold" color="#555555" style={{ marginLeft: 8 }}>{title}</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {children}
        </View>

      </View>
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, // 상단과 하단을 제외한 중단 전체 공간
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500, // 최대 너비 480px 제한
    alignSelf: 'center', // 핵심: 480px 컨테이너를 화면 중앙으로 정렬
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  body: {
    flex: 1, // 상단과 하단을 제외한 중단 전체 공간
  },
});