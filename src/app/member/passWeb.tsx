import { freeApi } from '@/utils/api';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WebView = Platform.OS === 'web' 
  ? null 
  : require('react-native-webview').WebView;

export default function passWeb() {

  const webViewRef = useRef<any>(null);
  const [certUrl, setCertUrl] = useState<string>(''); // psss주소
  const [loading, setLoading] = useState<boolean>(true);
  const [cftoken, setCftoken] = useState<string>('');

  useEffect(() => {
    fetchCertToken();
  }, []);


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
        
        setCftoken(token);
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
          setCertUrl(url);
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
      setLoading(false);
    }
  };

  // 2. PASS 앱 실행(딥링크) 가로채기
  const handleShouldStartLoadWithRequest = (request: any) => {
    if (Platform.OS === 'web') return true;
    
    const { url } = request;

    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:blank')) {
      if (Platform.OS === 'android') {
        Linking.canOpenURL(url).then((supported) => supported && Linking.openURL(url));
      } else {
        Linking.openURL(url).catch(() => {});
      }
      return false; // 외부 PASS 앱 열기
    }
    return true;
  };

  // 3. 성공/완료 URL 감지 시 가로채서 회원가입으로 이동
  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    if (url.includes('/member/join') || url.includes('/certification/success')) {
      // 웹뷰 로딩 즉시 중단
      webViewRef.current?.stopLoading();

      // 약관동의/인증 스택을 지우면서 회원가입 페이지로 전환
      if (cftoken) {
        router.replace({
          pathname: '/member/join',
          params: { cftoken },
        });
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A73E8" />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {certUrl ? (
        Platform.OS === 'web' ? (
          <View>
            본인인증중
          </View>
        ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: certUrl }}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          setSupportMultipleWindows={false}
          javaScriptCanOpenWindowsAutomatically={true}
          startInLoadingState={true}
          incognito={true}
          cacheEnabled={false}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1A73E8" />
            </View>
          )}
          style={{ flex: 1 }}
        />
        )
      ) : null}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});