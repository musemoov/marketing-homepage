// Edge Runtime 제거
// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('유효하지 않은 메시지 형식입니다.');
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('API 설정 오류가 발생했습니다. 관리자에게 문의해주세요.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 200,
        messages: [
          { 
            role: 'system', 
            content: `당신은 전략적인 마케팅 컨설턴트입니다. 다음 규칙을 따르세요:

1. 먼저 고객의 상황을 파악하는 질문으로 시작하세요
2. 가격 문의가 있을 때는 다음 단계를 따르세요:
   - 첫 번째 문의: 서비스의 가치와 ROI를 강조하며 설명
   - 두 번째 문의: 성공 사례와 구체적인 성과 수치를 언급
   - 세 번째 문의: "정확한 견적은 기업의 상황과 목표에 따라 맞춤 설계됩니다. 전문 상담사와 상세한 상담을 원하시면 02-1234-5678로 연락 주시기 바랍니다."
3. 성공 사례나 경쟁사 대비 장점을 언급하세요
4. 고객의 우려는 인정하고 해결책을 제시하세요
5. 기회비용이나 시급성을 적절히 활용하세요
6. 답변은 2-3문장으로 짧게 하고, 항상 추가 질문으로 대화를 이어가세요

가격 관련 키워드: 가격, 비용, 견적, 금액, 얼마, 요금, 플랜, 패키지, 가격표, 할인
이러한 키워드가 반복해서 나오면 위의 단계별 응답을 따르세요.`
          },
          ...messages
        ],
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // API 에러 로깅 (실제 에러 내용은 서버에만 기록)
      console.error('OpenAI API 에러:', {
        status: response.status,
        error: data.error
      });

      // 클라이언트에는 일반적인 에러 메시지만 전송
      return new Response(JSON.stringify({ 
        error: '죄송합니다. 요청을 처리하는 중에 문제가 발생했습니다.'
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const chatResponse = data.choices?.[0]?.message?.content?.trim();
    if (!chatResponse) {
      throw new Error('응답을 받지 못했습니다. 잠시 후 다시 시도해주세요.');
    }

    return new Response(JSON.stringify({ text: chatResponse }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    // 에러 로깅 (실제 에러 내용은 서버에만 기록)
    console.error('서버 에러:', error);

    // 클라이언트에는 일반적인 에러 메시지만 전송
    return new Response(JSON.stringify({ 
      error: '죄송합니다. 서비스에 일시적인 문제가 발생했습니다.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
} 