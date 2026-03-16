"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResponseBox from "@/components/ResponseBox";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setAnswer("");
    setError("");

    if (!file) {
      setImagePreview("");
      return;
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const speakAnswer = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const askTutor = async () => {
    if (!imageFile || !question.trim()) {
      setError("Please upload an image and ask a question.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");

      const imageBase64 = await fileToBase64(imageFile);

      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          imageBase64,
          mimeType: imageFile.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer);
      speakAnswer(data.answer);
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <div className="mb-3 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Gemini Multimodal Tutor
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            SnapTutor
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
            Upload homework or study material, ask a question naturally, and get
            a clear spoken explanation back.
          </p>
        </header>

        <section className="grid min-h-[calc(100vh-140px)] grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="h-full">
            <ImageUploader
              onImageChange={handleImageChange}
              preview={imagePreview}
            />
          </div>

          <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Ask your question</h2>
              <p className="mt-1 text-sm text-slate-500">
                Try: “Explain this step by step” or “What does this chart mean?”
              </p>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="min-h-[220px] w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-base outline-none transition focus:border-indigo-500 focus:bg-white"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={askTutor}
                disabled={loading}
                className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Thinking..." : "Ask SnapTutor"}
              </button>

              <button
                onClick={() => speakAnswer(answer)}
                disabled={!answer}
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Speak Answer
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Quick prompts</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Explain this step by step",
                  "What does this mean?",
                  "Make this simpler",
                  "What should I focus on first?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setQuestion(prompt)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-full">
            <ResponseBox answer={answer} loading={loading} />
          </div>
        </section>
      </div>
    </main>
  );
}