
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppText from '../../components/textAll';
import PageLayout from '../_LayoutIndex';

export default function index() {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log('로그인 시도:', id, pw, keepLoggedIn);
  };

  return (
    <PageLayout>
      <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true} // 안드로이드에서도 키보드 자동 밀림 적용
      extraScrollHeight={20} // 키보드와 TextInput 사이의 여백 공간 (선택)
      keyboardShouldPersistTaps="handled" // 입력창 바깥 터치 시 키보드 닫힘 유용 옵션
      >
        <View style={styles.container}>

            <View style={styles.card}>
                
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    placeholderTextColor="#A9A9A9"
                    value={id}
                    onChangeText={setId}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="PW"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry
                    value={pw}
                    onChangeText={setPw}
                />
                
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    activeOpacity={0.7}
                    onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                >
                    <Ionicons
                    name={keepLoggedIn ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={keepLoggedIn ? '#007AFF' : '#ccc'}
                    />
                    <AppText size={14} weight="500" color="#555555" style={{ marginLeft: 8 }}>로그인 상태 유지</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    activeOpacity={0.8}
                    onPress={handleLogin}
                >
                    <AppText size={16} weight="bold" color="#ffffff">로그인</AppText>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <TouchableOpacity>
                        <AppText size={14} weight="600">아이디 / 비밀번호 찾기</AppText>
                    </TouchableOpacity>
                    <Text style={styles.divider}>|</Text>
                    <TouchableOpacity
                      onPress={() => router.push('/member/agree')}
                    >
                        <AppText size={14} weight="600">회원가입</AppText>
                    </TouchableOpacity>
                </View>
              
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
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#C8D0D8', // 이미지 속 회색 버튼 색상
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  divider: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#CCC',
  },
});