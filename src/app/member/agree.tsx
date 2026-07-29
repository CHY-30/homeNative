
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMember';

export default function agree() {

    const [checkAll, setCheckAll] = useState(false);
    const [checkService, setCheckService] = useState(true);
    const [checkPrivacy, setCheckPrivacy] = useState(true);

    const isAllChecked = checkService && checkPrivacy;

    const handleCheckAll = () => {
      const nextState = !checkAll;
      setCheckAll(nextState);
      setCheckService(nextState);
      setCheckPrivacy(nextState);
    };
    
  return (
    <PageLayout
      title="< 회원가입 약관동의"
      leftAction={{
        onPress: () => router.push('/member/join'),
      }}
    >
      {/* ==================== 중단 영역 ==================== */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Pressable style={styles.allAgreeContainer} onPress={handleCheckAll}>
            <View style={styles.allAgreeHeader}>
              <CustomCheck checked={checkAll} />
              <AppText size={16} weight="700" color="#222222">
                약관 내용을 확인하였으며, 모두 동의합니다.
              </AppText>
            </View>
            <AppText size={12} color="#666666" style={{ textAlign: 'center' }}>
              공실클럽 이용약관, 개인정보 수집 및 이용 에 모두 동의 합니다.
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
      {/* =================================================== */}
    </PageLayout>
  );
}


function CustomCheck({ checked }: { checked: boolean }) {
  return (
    <View style={[styles.checkCircle, checked && styles.checkCircleChecked]}>
      <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
        <Polyline
          points="20 6 9 17 4 12"
          stroke={checked ? '#FFFFFF' : '#CCCCCC'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    // 그림자 효과 (iOS & Android)
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 2,
  },
  allAgreeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  allAgreeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkCircleChecked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
});