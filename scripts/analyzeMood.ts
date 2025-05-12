// scripts/analyzeMood.ts
export async function analyzeMood(text: string): Promise<string | null> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();

    if (Array.isArray(result) && result[0]?.label) {
      return result[0].label; // "POSITIVE" veya "NEGATIVE"
    }

    return null;
  } catch (error) {
    console.error('Hugging Face API hatası:', error);
    return null;
  }
}
