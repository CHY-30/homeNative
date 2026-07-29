
import { ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../../components/textAll';
import PageLayout from './_LayoutMember';

export default function agree() {

  return (
    <PageLayout
      title="< 회원가입 약관동의"
      leftAction={{
        onPress: () => router.back(),
      }}
    >
      {/* ==================== 중단 영역 ==================== */}
      <ScrollView contentContainerStyle={{ padding: 20, flex: 1 }}>
        <View style={styles.container}>
        <AppText size={22} weight="bold" color="#0F172A" style={{ marginBottom: 12 }}>
          홈택트
        </AppText>

        <AppText size={15} color="#475569" style={{ lineHeight: 22 }}>
          홈택트 설명..
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