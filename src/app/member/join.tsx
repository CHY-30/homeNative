import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMember';

export default function join() {

    const { certificationToken } = useLocalSearchParams<{ certificationToken: string }>();
    console.log(certificationToken);

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <PageLayout
      title="< 회원가입"
      leftAction={{
        onPress: () => router.push('/member/agree'),
      }}
    >
      {/* ==================== 중단 영역 ==================== */}
      <KeyboardAwareScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true} // 안드로이드에서도 키보드 자동 밀림 적용
      extraScrollHeight={20} // 키보드와 TextInput 사이의 여백 공간 (선택)
      keyboardShouldPersistTaps="handled" // 입력창 바깥 터치 시 키보드 닫힘 유용 옵션
      >
        <View style={styles.container}>
            <View style={styles.card}>

            <AppText size={20} weight="bold" color="#222" style={{lineHeight:28, marginBottom:24}}>공실클럽 가입을 위한{'\n'}회원님의 정보를 입력해 주세요.</AppText>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>이름</AppText>
                <TextInput
                style={[styles.input, styles.disabledInput]}
                value={name}
                editable={false}
                />
            </View>

            <View style={styles.inputGroup}>
            <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>생년월일</AppText>
                <TextInput
                style={[styles.input, styles.disabledInput]}
                value={birthDate}
                editable={false}
                />
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>휴대폰 번호</AppText>
                <TextInput
                style={[styles.input, styles.disabledInput]}
                value={phone}
                editable={false}
                />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>익명글 닉네임<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                    <AppText size={12} color="#888" style={{marginBottom:8}}>ⓘ</AppText>
                </View>
                <View style={styles.rowInputContainer}>
                <TextInput
                    style={[styles.input, styles.flexInput]}
                    value={nickname}
                    onChangeText={setNickname}
                />
                <TouchableOpacity style={styles.actionButton}>
                    <AppText size={14} weight="bold" color="#1A73E8">중복확인</AppText>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>이메일</AppText>
                <TextInput
                style={[styles.input, styles.errorBorder]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>아이디<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <View style={styles.rowInputContainer}>
                    <TextInput
                        style={[styles.input, styles.flexInput]}
                        value={userId}
                        onChangeText={setUserId}
                    />
                    <TouchableOpacity style={[styles.actionButton, styles.disabledActionButton]}>
                        <AppText size={14} weight="bold" color="#1A73E8">중복확인</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>비밀번호<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <TextInput
                style={[styles.input]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>비밀번호 확인<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <TextInput
                style={[styles.input]}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                />
            </View>

            <TouchableOpacity
                style={[styles.submitButton, styles.submitButtonActive]}
                disabled={false}
                onPress={() => console.log('전송하기')}
            >
                <AppText size={15} weight="700" color="#FFFFFF">다음</AppText>
            </TouchableOpacity>
            
            </View>
        </View>
      </KeyboardAwareScrollView>
      {/* =================================================== */}
    </PageLayout>
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
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FFF',
  },
  disabledInput: {
    backgroundColor: '#F2F2F2',
    color: '#666',
    borderColor: '#E0E0E0',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexInput: {
    flex: 1,
    marginRight: 8,
  },
  errorBorder: {
    borderColor: '#FF4D4D',
  },
  actionButton: {
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1A73E8',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  disabledActionButton: {
    borderColor: '#D0D0D0',
    backgroundColor: '#D0D0D0',
  },
  submitButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#D1D5DB',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonActive: {
    backgroundColor: '#003399',
  },
});