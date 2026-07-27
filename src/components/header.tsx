import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppText from './AppText';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.sideArea}>
        <Pressable onPress={() => console.log('뒤로가기')}>
          <AppText size={16} weight="bold" color="#FFFFFF">← 뒤로</AppText>
        </Pressable>
      </View>

      <View style={styles.centerArea}>
        <AppText size={18} weight="bold" color="#FFFFFF">페이지 타이틀</AppText>
      </View>

      <View style={styles.sideAreaRight}></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sideArea: {
    flex: 1,
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  centerArea: {
    // 가운데는 내용 크기만큼만 차지하고 정중앙 유지
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideAreaRight: {
    flex: 1,
    alignItems: 'flex-end',   // 오른쪽 정렬
  },
});