import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import PageLayout from './_LayoutMember';

export default function passWeb() {

  const { cftoken } = useLocalSearchParams<{ cftoken: string }>();
  const certUrl = `https://dev.gongsiltoday.com/certification?token=${cftoken}`;
  const webViewRef = useRef<any>(null);

  // 2. PASS 앱 실행(딥링크) 가로채기
  const handleShouldStartLoadWithRequest = (request: WebViewNavigation) => {
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
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
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
  
  return (
    <PageLayout
      title="< 본인인증"
      leftAction={{
        onPress: () => router.push('/member/agree'),
      }}
    >
      <View style={styles.container}>
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
      </View>
    </PageLayout>
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