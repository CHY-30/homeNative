import { freeApi } from '@/utils/api';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function passWeb() {

  const webViewRef = useRef<WebView>(null);
  const [certUrl, setCertUrl] = useState<string>(''); // psss주소
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCertToken();
  }, []);


  const fetchCertToken = async () => {
    try {
      // 본인인증 토큰 발급 API 호출
      const response = await freeApi('/api/certifications/token/SIGN_UP');
      const token = response.data.result.certificationToken;
      
      if (token) {
        setCertUrl(`https://dev.gongsiltoday.com/certification?token=${token}`);
      } else {
        alert('인증 토큰 발급에 실패했습니다.');
        router.back();
      }
    } catch (error) {
        alert('통신 중 오류가 발생했습니다.');
        router.back();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View>
      <Text>Pass Web Screen</Text>
    </View>
  );
}