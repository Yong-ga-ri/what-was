require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

const getKeywordsResponse = async (req) => {
	const prompt = "다음 나의 설명으로 단어 20개를 추론해주세요. \n " +
		"조건:', ' 단위로 키워드만 전달해주세요. \n" +
		"예시 설명: 일정한 속도? 규칙으로 깜빡이는 형태 또는 소리 \n" +
		"예시 결과: 간헐적, 주기적, 규칙적, 반복적, 리드미컬, 율동적, 등간격의, 템포, 패턴, 사이클, 펄스, 신호, 리듬, 박자, 타이머, 깜빡임, 플래싱, 비트, 메트로놈, 진동  \n\n" +
		" 설명: " + req;

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 500
		});
		return response.choices[0].message.content;
	} catch (err) {
		throw new Error('request Failed')
	}
}

const getIdiomResponse = async (req) => {
	const prompt = "다음 설명과 관련있는 숙어 10개를 전달해주세요. \n " +
		"조건:', ' 단위로 문장만 전달해주세요. \n" +
		"예시 설명: 배가고파서 음식을 많이 먹었는데 오히려 배탈이 나는 상황 \n" +
		"예시 결과: 과유불급, 빈대 잡으려고 초가삼간 태운다, 뱁새가 황새 따라가다 가랑이 찢어진다, 목구멍이 포도청이다, 자업자득, 득보다 실이 크다, 소탐대실, 과음과식, 넘어지면 코가 깨진다, 몸살이 나다 \n\n" +
		"설명: " + req;
	
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 500
		});
		return response.choices[0].message.content;
	} catch (err) {
		throw new Error('request Failed')
	}
}

module.exports = { getKeywordsResponse, getIdiomResponse };