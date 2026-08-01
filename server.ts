import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSy_demo_key";
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ================= API ENDPOINTS =================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "MAGA Real Estate", timestamp: new Date().toISOString() });
});

// AI Assistant endpoint using Gemini 3.6 Flash
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { prompt, language = "ar", contextData } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "الرجاء إدخال الاستفسار بشكل صحيح" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `أنت المساعد العقاري الذكي والافتراضي لشركة "ماجا العقارية" (MAGA Real Estate - ماجا العقارية).
تتميز الشركة بالاستثمار والتطوير العقاري الفاخر بالمملكة العربية السعودية (الرياض، جدة، الخبر، المجمعة).
معلومات التواصل بالشركة:
- هاتف وواتساب: +966 55 499 9928
- البريد الإلكتروني: magaksa2030@gmail.com
- أبرز المشاريع: مجمع ماجا ريزيدنس الحطين، أبراج ماجا جاردنز الملقا، ضاحية ماجا الزمرّد بأبحر جدة، مجمع ماجا التجاري النرجس.

دورك:
1. الإجابة بلباقة واحترافية وبأسلوب فاخر ومباشر بلغة المستخدم (إذا كانت اللغة العربية أجِب بالعربية الجذبة، وإذا كانت الإنجليزية أجِب بالإنجليزية).
2. اقتراح العقارات والفرص الاستثمارية المناسبة وحساب العوائد التقريبية وتسهيل حجز المواعيد.
3. الإجابة عن التمويل العقاري وأنظمة التمويل وحاسبات الأقساط.
4. إبراز هوية ماجا العقارية كشركة رائدة تنافس كبرى الشركات مثل OSUS و ROSHN و NHC.

إذا استفسر عن عقار معين، اذكر مميزاته باختصار ودعه ينقر على طلب معاينة أو يتواصل عبر الواتساب المباشر +966554999928.`;

    const userContent = `طلب العميل: ${prompt}
${contextData ? `السياق الحسابي أو العقاري: ${JSON.stringify(contextData)}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userContent,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "أهلاً بك في ماجا العقارية! يسعدنا تقديم الاستشارة العقارية الفاخرة لك. يمكنك التواصل معنا مباشرة عبر +966554999928.";

    res.json({
      reply: replyText,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      reply: "أهلاً بك في ماجا العقارية! فريق المبيعات والاستشارات جاهز لخدمتك مباشرة عبر الهاتف أو الواتساب: +966 55 499 9928.",
      error: error?.message || "Internal AI service issue",
    });
  }
});

// Mock Store for Appointments
const appointmentsStore: any[] = [];
app.post("/api/appointments", (req, res) => {
  const { propertyId, propertyTitleAr, clientName, clientPhone, clientEmail, preferredDate, preferredTime, notes } = req.body;
  if (!clientName || !clientPhone) {
    return res.status(400).json({ error: "اسم العميل ورقم الجوال مطلوبان" });
  }
  const newAppointment = {
    id: `apt-${Date.now()}`,
    propertyId,
    propertyTitleAr,
    clientName,
    clientPhone,
    clientEmail,
    preferredDate,
    preferredTime,
    notes,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  appointmentsStore.push(newAppointment);
  res.json({ success: true, message: "تم تسجيل موعد المعاينة بنجاح، سيتواصل معك مستشار ماجا العقارية قريباً.", appointment: newAppointment });
});

app.get("/api/appointments", (req, res) => {
  res.json({ appointments: appointmentsStore });
});

// ================= VITE & STATIC FILES =================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MAGA Real Estate Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
