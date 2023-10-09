export class AIService {
  constructor(
    private readonly gateway: string,
    private readonly openAiKey: string,
    private readonly restApiKey: string
  ) {}

  async runWorkerAiAsync(model: string, body: string): Promise<any> {
    const response = await fetch(
      `https://gateway.ai.cloudflare.com/v1/ce9999d7d59fce98a0bc0e7911cb6e1f/${this.gateway}/workers-ai/${model}`,
      {
        headers: {
          Authorization: "Bearer " + this.restApiKey,
          "Content-Type": "application/json",
        },
        method: "POST",
        body,
      }
    );
    return await response.json();
  }

  async runOpenAiAsync(body: string): Promise<any> {
    const response = await fetch(
      `https://gateway.ai.cloudflare.com/v1/ce9999d7d59fce98a0bc0e7911cb6e1f/${this.gateway}/openai/chat/completions`,
      {
        headers: {
          Authorization: "Bearer " + this.openAiKey,
          "Content-Type": "application/json",
        },
        method: "POST",
        body,
      }
    );
    return await response.json();
  }
}
