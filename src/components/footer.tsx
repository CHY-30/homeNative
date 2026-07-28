import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';

export default function Footer() {
  return (
    <View style={styles.container}>
      {/* 하단 탭바나 하단 버튼 컴포넌트 배치 */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('클릭')}>
        <AppText size={16} weight="bold" color="#FFFFFF">
          하단 고정 버튼 / 탭바 컴포넌트1
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});