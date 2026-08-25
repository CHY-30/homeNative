import { freeApi } from '@/utils/api';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMember';

export default function agree() {

    const [checkAll, setCheckAll] = useState(false);
    const [checkService, setCheckService] = useState(false);
    const [checkPrivacy, setCheckPrivacy] = useState(false);

    const isAllChecked = checkService && checkPrivacy;

    const handleCheckAll = () => {
      const nextState = !checkAll;
      setCheckAll(nextState);
      setCheckService(nextState);
      setCheckPrivacy(nextState);
    };

    const handleCheckItem = (type: 'service' | 'privacy') => {
      if (type === 'service') {
        const nextService = !checkService;
        setCheckService(nextService);
        setCheckAll(nextService && checkPrivacy);
      } else {
        const nextPrivacy = !checkPrivacy;
        setCheckPrivacy(nextPrivacy);
        setCheckAll(checkService && nextPrivacy);
      }
    };

    const fetchCertToken = async () => {

      let popupWindow: Window | null = null;
      if (Platform.OS === 'web') {
        popupWindow = window.open(
          'about:blank',
          'PASS_AUTH',
          'width=500,height=600,scrollbars=yes'
        );
      }
  
      try {
        // 본인인증 토큰 발급 API 호출
        const response = await freeApi('/api/certifications/token/SIGN_UP');
        const token = response.data.result.certificationToken;
  
        if (token) {
          
          const url = `https://dev.gongsiltoday.com/certification?token=${token}`;
  
          if (Platform.OS === 'web' && popupWindow) {
  
            popupWindow.location.href = url;
            
            const checkClosedTimer = setInterval(async () => {
  
              if (popupWindow?.closed) {
                clearInterval(checkClosedTimer);
                try {
                  const verifyRes = await freeApi(`/api/certifications/verify?token=${token}&type=SIGN_UP`);
    
                  if (verifyRes.data?.result === true || verifyRes.data?.code === '0') {
                    console.log('인증 검증 성공!');
                    router.replace({
                      pathname: '/member/join',
                      params: { cftoken: token },
                    });
                  } else {
                    console.log('인증이 정상적으로 완료되지 않았습니다.');
                  }
                } catch (err) {
                  console.error('인증 검증 중 오류 발생 (사용자 취소 등):', err);
                }
              }
            }, 500);
  
          } else {
            router.push(`/member/passWeb?cftoken=${token}`);
          }
        } else {
          if (popupWindow) popupWindow.close();
          alert('인증 토큰 발급에 실패했습니다.');
          router.back();
        }
      } catch (error) {
          if (popupWindow) popupWindow.close();
          alert('통신 중 오류가 발생했습니다.');
          router.back();
      } finally {
        //setLoading(false);
      }
    };
    
  return (
    <PageLayout
      title="< 회원가입 약관동의"
      leftAction={{
        onPress: () => router.push('/member/login'),
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
            <AppText size={12} color="#666666" style={{ paddingLeft: 33 }}>
              공실클럽 이용약관, 개인정보 수집 및 이용 에 모두 동의 합니다.
            </AppText>
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.termRow}>
            <Pressable 
              style={styles.termLeft} 
              onPress={() => handleCheckItem('service')}
            >
              <CustomCheck checked={checkService} />
              <AppText size={14} weight="500" color="#333333">(필수) 서비스 이용약관 동의</AppText>
            </Pressable>
            <TouchableOpacity 
              style={styles.arrowButton} 
              onPress={() => console.log('서비스 이용약관 상세')}
            >
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.termRow}>
            <Pressable 
              style={styles.termLeft} 
              onPress={() => handleCheckItem('privacy')}
            >
              <CustomCheck checked={checkPrivacy} />
              <AppText size={14} weight="500" color="#333333">(필수) 개인정보 수집 및 이용동의</AppText>
            </Pressable>
            <TouchableOpacity 
              style={styles.arrowButton} 
              onPress={() => console.log('개인정보 수집 상세')}
            >
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isAllChecked && styles.submitButtonActive]}
            disabled={!isAllChecked}
            onPress={() => fetchCertToken()}
          >
            <AppText size={15} weight="700" color="#FFFFFF">휴대폰 인증하기</AppText>
          </TouchableOpacity>
          
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

function ChevronRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="9 18 15 12 9 6"
        stroke="#AAAAAA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 150,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    // 그림자 효과 (iOS & Android)
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 2,
  },
  allAgreeContainer: {
    marginBottom: 16,
  },
  allAgreeHeader: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  termLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  arrowButton: {
    padding: 4,
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
    backgroundColor: '#003399',
    borderColor: '#003399',
  },
  submitButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonActive: {
    backgroundColor: '#003399',
  },
});