import React from 'react';
import { ScrollView } from 'react-native';
import PageLayout from '../components/pageLayout';
import AppText from './appText';

export default function MyScreen() {
  return (
    <PageLayout>
      {/* ==================== 중단 영역 ==================== */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <AppText size={22} weight="bold" color="#0F172A" style={{ marginBottom: 12 }}>
          중단 메인 콘텐츠
        </AppText>

        <AppText size={15} color="#475569" style={{ lineHeight: 22 }}>
          상단(Header)과 하단(Footer)은 커스텀 UI 컴포넌트로 분리되어 상/하단에 고정되고,
          중단은 ScrollView, FlatList 등 원하는 스크롤/레이아웃으로 자유롭게 컨트롤 가능합니다.
        </AppText>
      </ScrollView>
      {/* =================================================== */}
    </PageLayout>
  );
}