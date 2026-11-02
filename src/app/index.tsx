
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../components/textAll';
import PageLayout from './_LayoutIndex';

export default function index() {

  /*
  페이지 로딩후 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/member/login');
    }, 0);

    return () => clearTimeout(timer);
  },[]);
  */
  


  return (
    <PageLayout>
      {/* ==================== 중단 영역 ==================== */}
      <ScrollView contentContainerStyle={{ padding: 20, flex: 1 }}>
        <View style={styles.container}>
        <AppText size={22} weight="bold" color="#0F172A" style={{ marginBottom: 20 }}>
          홈택트
        </AppText>

        <AppText size={15} color="#475569" style={{ lineHeight: 22, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => router.push('/member/login')}>
            로그인 페이지
          </TouchableOpacity>
        </AppText>

        <AppText size={15} color="#475569" style={{ lineHeight: 22 }}>
          <TouchableOpacity onPress={() => router.push('/map/naverMap')}> 
            지도 페이지
          </TouchableOpacity>
        </AppText>

        </View>
      </ScrollView>
      {/* =================================================== */}
    </PageLayout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});