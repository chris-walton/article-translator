import { Hono } from "hono";
import { Context, Context_Env, Context_Variables } from "./context";
import { TEXT_MODELS } from "./CONSTS";
import { cors, verify } from "./middle";
import { AIService } from "./services";

const app = new Hono<{ Bindings: Context_Env; Variables: Context_Variables }>();

app.use("*", async (ctx, next) => {
  ctx.set(
    "ai",
    new AIService(
      ctx.env.AI_GATEWAY,
      ctx.env.OPEN_AI_KEY,
      ctx.env.AI_REST_TOKEN
    )
  );
  //
  await next();
});
app.use("*", cors);
app.options("*", cors, (c) => c.text(""));

app.get("api/models/text", (ctx) => ctx.json(TEXT_MODELS));
app.post("api/run/worker-ai", verify, async (ctx: Context) => {
  try {
    const body: { model: string; body: string } = await ctx.req.json();

    return ctx.json(
      await ctx.var.ai.runWorkerAiAsync(body.model, JSON.stringify(body.body))
    );
  } catch (err: any) {
    console.log(err.message);
    console.log(err.toString());
    return ctx.text(err.message, 500);
  }
});
app.post("api/run/open-ai", verify, async (ctx: Context) =>
  ctx.json(await ctx.var.ai.runOpenAiAsync(await ctx.req.text()))
);

app.get("api/messages", verify, async (ctx: Context) =>
  ctx.text((await ctx.env.KV_DATA.get("LOGS")) ?? "[]", 200, {
    "Content-Type": "application/json",
  })
);
app.put("api/messages/:id", verify, async (ctx: Context) => {
  const { id } = ctx.req.param();
  const log = await ctx.req.json();

  if (id !== log.id) return ctx.text("Bad Requestion", 400);

  const list = (await ctx.env.KV_DATA.get<any[]>("LOGS", "json")) ?? [];
  const index = list.findIndex((x) => x.id === id);

  if (index > -1) list[index] = log;
  else list.splice(0, 0, log);

  ctx.executionCtx.waitUntil(ctx.env.KV_DATA.put("LOGS", JSON.stringify(list)));

  return ctx.newResponse(null, { status: 204 });
});
app.delete("api/messages/:id", verify, async (ctx: Context) => {
  const { id } = ctx.req.param();

  const list = (await ctx.env.KV_DATA.get<any[]>("LOGS", "json")) ?? [];
  const index = list.findIndex((x) => x.id === id);

  if (index === -1) return ctx.text("Bad Requestion", 400);

  list.splice(index, 1);

  ctx.executionCtx.waitUntil(ctx.env.KV_DATA.put("LOGS", JSON.stringify(list)));

  return ctx.newResponse(null, { status: 204 });
});
export default app;
