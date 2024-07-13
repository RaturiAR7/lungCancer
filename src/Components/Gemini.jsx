import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function Gemini() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  async function runChat(message) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });
    //////////Validation
    const validationString =
      "$ Please tell if the message before dollar symbol is related to lung cancer or health. If it is related to health or cancer give 1 as a reply else 0.";
    const reply = await chat.sendMessage(message + validationString);
    console.log(reply.response.text());
    if (reply.response.text() === "0") {
      setData("Please ask questions related to health");
      setLoading(false);
      return;
    }

    const prompt = "Act as a doctor. ";
    const result = await chat.sendMessage(prompt + message);
    const response = result.response;
    setData(response.text());
    setLoading(false);
  }

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const message = event.target?.prompt?.value || "";
    runChat(message);
  };

  function formatResponse(response) {
    const formattedResponse = response.split("*");
    return (
      <div className='bg-gray-300'>
        {formattedResponse.map((section, index) =>
          index % 2 === 0 ? ( // Check for even index (heading)
            <h2 className='text-base font-bold'>{section}</h2>
          ) : (
            <p className='text-sm font-mono'>{section}</p>
          )
        )}
      </div>
    );
  }
  return (
    <main className='w-full flex-col flex gap-3 justify-center items-center'>
      <h2 className='mb-2 font-extrabold text-blue-400 text-xl text-center'>
        Chatbot{" "}
        <span className='text-black text-sm'>Powered by Google Gemini</span>
      </h2>
      <form className='flex md:flex-row gap-2 w-full px-5' onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Type here...'
          name='prompt'
          className='border-gray-300 bg-slate-100 text-lg px-3 font-semibold text-gray-500 w-1/2 rounded-lg'
        />{" "}
        <button
          type='submit'
          className='font-bold h-10 w-28 rounded-xl hover:bg-white bg-blue-50'
        >
          Submit
        </button>
      </form>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='overflow-y-auto h-56'>
          {data !== "" && formatResponse(data)}
        </div>
      )}
    </main>
  );
}
