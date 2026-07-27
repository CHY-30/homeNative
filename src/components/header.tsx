import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './appText';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* 텍스트뿐만 아니라 버튼, 아이콘 등 원하는 컴포넌트를 자유롭게 배치 */}
      <TouchableOpacity onPress={() => console.log('뒤로가기')}>
        <AppText size={16} weight="bold" color="#FFFFFF">← 뒤로</AppText>
      </TouchableOpacity>

      <AppText size={18} weight="bold" color="#FFFFFF">페이지 타이틀</AppText>

      <TouchableOpacity onPress={() => console.log('메뉴')}>
        <AppText size={16} weight="bold" color="#FFFFFF">메뉴</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});