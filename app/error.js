'use client'; // 에러 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // 에러를 로그 서비스(Sentry 등)에 기록할 때 사용합니다.
    console.error('Captured Error:', error);
  }, [error]);

  // 에러 메시지나 상황에 따른 분류
  const getErrorMessage = () => {
    if (error.digest?.includes('401') || error.message.includes('unauthorized')) {
      return {
        title: "로그인이 필요합니다.",
        description: "이 페이지에 접근 권한이 없습니다. 다시 로그인해 주세요.",
      };
    }
    
    if (error.message.includes('fetch')) {
      return {
        title: "네트워크 오류",
        description: "데이터를 불러오는 데 실패했습니다. 연결 상태를 확인하세요.",
      };
    }

    // 기본 에러 메시지 (500 등)
    return {
      title: "문제가 발생했습니다.",
      description: "서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  };

  const content = getErrorMessage();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{content.title}</h1>
      <p style={styles.desc}>{content.description}</p>
      
      <div style={styles.buttonGroup}>
        <button onClick={() => reset()} style={styles.retryBtn}>
          다시 시도
        </button>
        <button onClick={() => window.location.href = '/'} style={styles.homeBtn}>
          홈으로 이동
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' },
  title: { fontSize: '2rem', color: '#333', marginBottom: '10px' },
  desc: { color: '#666', marginBottom: '20px' },
  buttonGroup: { display: 'flex', gap: '10px' },
  retryBtn: { padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  homeBtn: { padding: '10px 20px', backgroundColor: '#eaeaea', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};