import { freeApi } from '@/utils/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMember';

export default function join() {

    interface joinForm{
      userName: string;
      birthday: string;
      telephone: string;
      loginId: string;
      nickName : string;
      email: string;
      password: string;
      password_re: string;
      isNicknameChecked: boolean;
      isloginIdChecked: boolean;
    }

    const { cftoken } = useLocalSearchParams<{ cftoken: string }>();

    useEffect(() => {

        if(cftoken === null){
          alert('인증코드가 없습니다. 다시 진행해주세요.');
          return
        }// 없으면 부르지마 글쓰기 수정X
        const fetchData = async () => {
          try {
            const res = await freeApi.post('/api/certifications/sign-up',{
                certificationToken: cftoken,
                tokenReusable: true,
            });
            const sUData = res.data.result;
            setValue("userName", sUData.userName);
            setValue("birthday", sUData.birthday);
            setValue("telephone", sUData.mobilePhone);

          } catch (err) {
            alert("데이터 불러오기 실패"+err);
          }
        };
        
        fetchData();
        trigger();
    }, [cftoken]);

    const {
      control,
      trigger,
      handleSubmit,
      setValue, 
      getValues,
      setError,
      clearErrors,
      watch,
      formState: { errors },
    } = useForm<joinForm>({
      mode: "onChange", // 실시간 검증
      defaultValues: {
        userName: "",
        birthday: "",
        telephone: "",
        nickName: "",
        isNicknameChecked: false,
        isloginIdChecked: false,
      }
    });

    const onNickNameCheck = async (nickName: string) =>{
      try{
        const res = await freeApi.get(`/api/accounts/exists/nick-name/${nickName}`);
        const isnickName = res.data.result === true;
        if(isnickName){
          setError("nickName", {
            type: "manual",
            message: "이미 사용중인 닉네임 입니다."
          });
        }
        else{
          setValue("isNicknameChecked", true);
          clearErrors("nickName");
        }
      } catch(err) {
        alert("닉네임 중복 검사 실패 다시시도해주세요. " + err);
      }
    }

    const onLoginIdCheck = async (loginId: string) =>{
      try{
        const res = await freeApi.get(`/api/accounts/exists/login-id/${loginId}`)
        const isloginId = res.data.result === true;
        if(isloginId){
          setError("loginId", {
            type: "manual",
            message: "이미 사용중인 아이디 입니다."
          });
        }
        else{
          setValue("isloginIdChecked", true);
          clearErrors("loginId");
        }

      } catch(err) {
        alert("아이디 중복 검사 실패 다시시도해주세요. " + err);
      }

    }

    const isNicknameChecked = watch("isNicknameChecked");
    const isloginIdChecked = watch("isloginIdChecked");

    const onsubmit = async (data: joinForm) =>{

      

    }

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
              <Controller
                control={control}
                name="userName"
                render={({ field: { value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={value}
                    editable={false}
                  />
                )}
              />
            </View>

            <View style={styles.inputGroup}>
              <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>생년월일</AppText>
              <Controller
                control={control}
                name="birthday"
                render={({ field: { value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={value}
                    editable={false}
                  />
                )}
              />
            </View>

            <View style={styles.inputGroup}>
              <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>휴대폰 번호</AppText>
              <Controller
                control={control}
                name="telephone"
                render={({ field: { value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={value}
                    editable={false}
                  />
                )}
              />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>익명글 닉네임<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                    <AppText size={12} color="#888" style={{marginBottom:8}}>ⓘ</AppText>
                </View>
                <View style={styles.rowInputContainer}>
                <Controller
                  control={control}
                  name="nickName"
                  rules={{
                    required: "닉네임을 입력해 주세요.",
                    pattern: {value: /^[가-힣a-zA-Z0-9]{2,12}$/, message: "2~12자 띄어쓰기 없이 한글/영문/숫자만 입력해 주세요.",},
                    validate: () => isNicknameChecked || "닉네임 중복확인을 진행해 주세요.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.nickName ? styles.errorflex : styles.flexInput]}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        setValue("isNicknameChecked", false);
                      }}
                      value={value}
                      maxLength={12}
                    />
                  )}
                />
                <TouchableOpacity 
                  style={[styles.actionButton, errors.nickName && !errors.nickName.message?.includes("중복확인") || isNicknameChecked ? styles.disabledActionButton : '']}
                  disabled={isNicknameChecked || !!errors.nickName && !errors.nickName.message?.includes("중복확인") }
                  onPress={() => {
                      const nickNameText = getValues('nickName');
                      onNickNameCheck(nickNameText);
                    }
                  }
                >
                  <AppText size={14} weight="bold" color="#1A73E8">중복확인</AppText>
                </TouchableOpacity>
                </View>
                {errors.nickName && (
                  <AppText color="#FF4D4D" size={13}>{errors.nickName.message}</AppText>
                )}
                {isNicknameChecked && (
                  <AppText color="#00B894" size={13}>
                    사용 가능한 닉네임 입니다.
                  </AppText>
                )}
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>이메일</AppText>
                <View style={styles.rowInputContainer}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "이메일을 입력해 주세요.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "올바른 이메일 형식이 아닙니다.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.email ? styles.errorflex : styles.flexInput]}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      value={value}
                      maxLength={50}
                    />
                  )}
                />
                </View>
                {errors.email && (
                  <AppText color="#FF4D4D" size={13}>{errors.email.message}</AppText>
                )}
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>아이디<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <View style={styles.rowInputContainer}>
                <Controller
                  control={control}
                  name="loginId"
                  rules={{
                    required: "아이디를 입력해 주세요.",
                    pattern: {value: /^[a-zA-Z0-9_-]{5,20}$/, message: "5~20자의 영문/숫자와 특수 문자 (_,-)만 사용 가능합니다.",},
                    validate: () => isloginIdChecked || "닉네임 중복확인을 진행해 주세요.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.loginId ? styles.errorflex : styles.flexInput]}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        setValue("isloginIdChecked", false);
                      }}
                      value={value}
                      maxLength={12}
                    />
                  )}
                />
                <TouchableOpacity 
                  style={[styles.actionButton, errors.loginId && !errors.loginId.message?.includes("중복확인") || isloginIdChecked ? styles.disabledActionButton : '']}
                  disabled={isloginIdChecked || !!errors.loginId && !errors.loginId.message?.includes("중복확인") }
                  onPress={() => {
                      const loginIdText = getValues('loginId');
                      onLoginIdCheck(loginIdText);
                    }
                  }
                >
                  <AppText size={14} weight="bold" color="#1A73E8">중복확인</AppText>
                </TouchableOpacity>
                </View>
                {errors.loginId && (
                  <AppText color="#FF4D4D" size={13}>{errors.loginId.message}</AppText>
                )}
                {isloginIdChecked && (
                  <AppText color="#00B894" size={13}>
                    사용 가능한 아이디 입니다.
                  </AppText>
                )}
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>비밀번호<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <View style={styles.rowInputContainer}>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "비밀번호를 입력해 주세요.",
                    pattern: {
                      value: /^(?=(.*[a-zA-Z].*[0-9])|(?=.*[a-zA-Z].*[^a-zA-Z0-9])|(?=.*[0-9].*[^a-zA-Z0-9])).{8,20}$/,
                      message: "8~20자의 영문, 숫자, 특수문자 중 2가지 이상을 조합해 주세요.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.password ? styles.errorflex : styles.flexInput]}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      value={value}
                      maxLength={50}
                    />
                  )}
                />
                </View>
                {errors.password && (
                  <AppText color="#FF4D4D" size={13}>{errors.password.message}</AppText>
                )}
            </View>

            <View style={styles.inputGroup}>
                <AppText size={14} weight="600" color="#333" style={{marginBottom:8}}>비밀번호 확인<AppText style={{color: '#1A73E8'}}> *</AppText></AppText>
                <View style={styles.rowInputContainer}>
                <Controller
                  control={control}
                  name="password_re"
                  rules={{
                    required: "비밀번호를 한 번 더 입력해 주세요.",
                    validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.password_re ? styles.errorflex : styles.flexInput]}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      value={value}
                      maxLength={50}
                    />
                  )}
                />
                </View>
                {errors.password_re && (
                  <AppText color="#FF4D4D" size={13}>{errors.password_re.message}</AppText>
                )}
            </View>

            <TouchableOpacity
                style={[styles.submitButton, styles.submitButtonActive]}
                disabled={false}
                onPress={handleSubmit(onsubmit)}
            >
                <AppText size={15} weight="700" color="#FFFFFF">다음</AppText>
            </TouchableOpacity>
            </View>
        </View>
      </KeyboardAwareScrollView>
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
  errorflex: {
    borderColor: '#FF4D4D',
    flex: 1,
    marginRight: 8,
    outlineStyle: 'none',
  },
  errorBorder: {
    borderColor: '#FF4D4D',
    outlineStyle: 'none',
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
