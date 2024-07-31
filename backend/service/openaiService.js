require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

const getKeywordsResponse = async (req) => {
	const prompt = "다음 나의 설명으로 단어 10개를 추론해주세요. \n " +
		"조건 1. ', ' 단위로 키워드만 전달해주세요." +
		"예를 들면, 일정한 속도? 규칙으로 깜빡이는 형태 또는 소리라고 입력하면 ‘간헐적’과 같이 나와야합니다" +
		" \n설명: " + req;
	
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 500
		});
		return response.choices[0].message.content;
	} catch (err) {
		console.log("err: ", err);
		throw new Error('request Failed')
	}
}

const getIdiomsResponse = async (req) => {
	const prompt = "다음 나의 설명으로 추정되는 숙어 5개를 전달해주세요. ', ' 단위로 문장만 전달해주세요. \n설명: " + req;
	
	try {
		openai.createCompletion({
			model: "gpt-3.5-turbo-instruct",
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 500
		});
		return response.choices[0].message.content;
	} catch (err) {
		throw new Error('request Failed')
	}
}

module.exports = { getKeywordsResponse, getIdiomsResponse };