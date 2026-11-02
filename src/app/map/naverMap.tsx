import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMap';

export default function login() {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log('로그인 시도:', id, pw, keepLoggedIn);
  };

  return (
    <PageLayout
      title="< 네이버지도"
      leftAction={{
        onPress: () => router.push('/'),
      }}
    >
      <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true} // 안드로이드에서도 키보드 자동 밀림 적용
      extraScrollHeight={20} // 키보드와 TextInput 사이의 여백 공간 (선택)
      keyboardShouldPersistTaps="handled" // 입력창 바깥 터치 시 키보드 닫힘 유용 옵션
      >
        <View style={styles.container}>
                
                <View style={styles.maparea}>
                    
                </View>

        </View>
        
      </KeyboardAwareScrollView>
    </PageLayout>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  maparea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  }
});