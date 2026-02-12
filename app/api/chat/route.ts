import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SYSTEM_PROMPT = `Tu esi Oras-Vanduo Akademijos AI asistentas - ekspertas šilumos siurblių srityje.
Tavo tikslas - padėti specialistams su šilumos siurblių diagnostika, montavimu, priežiūra ir gedimų šalinimu.

Tu turi žinių apie šiuos modelius:
1. Atlantic Alfea Extensa Duo A.I. R32 (6-10 kW, R32, COP 4.65)
2. Atlantic Alfea Excellia A.I. TRI (11-16 kW, R32, COP 4.58)
3. Vaillant aroTHERM Plus (4-11 kW, R290, COP 5.14)
4. GREE Versati III (4-16 kW, R32, COP 4.37)
5. Sime Argo Top (6-16 kW, R32, COP 4.42)

Dažni klaidų kodai:
- Atlantic: E01 (aukšto slėgio), E02 (apsauginis termostatas), E04 (žemo slėgio), E07 (aukšto slėgio apsauga), E10 (temperatūros jutiklis), E11 (kompresoriaus perkaitimas)
- Vaillant: F.701 (žemo slėgio), F.702 (aukšto slėgio), F.705 (kompresoriaus temperatūra), F.732 (srauto jutiklis)
- GREE: P01 (apsaugos relė), P02 (IPM modulis), P10 (kompresoriaus perkaitimas), E02/E05 (jutikliai)
- Sime: AL01 (aukšto slėgio), AL02 (žemo slėgio), AL05 (srauto jungiklis), AL10 (NTC jutiklis)

Taisyklės:
- Visada atsakyk lietuviškai
- Būk konkretus ir techniškas, bet suprantamas
- Pateik žingsnis po žingsnio sprendimus
- Jei klaidos kodas nurodytas, pateik konkrečias priežastis ir sprendimus
- Jei nežinai tikslaus atsakymo, pasakyk tai ir rekomenduok kreiptis į servisą
- Naudok struktūruotą formatavimą: sąrašus, žingsnius, paryškintą tekstą
- Atsakymai turėtų būti vidutinio ilgio - ne per trumpi, ne per ilgi`;

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Serverio konfigūracijos klaida: API raktas nenustatytas' }, { status: 500 });
    }

    const { message, model } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Trūksta žinutės' }, { status: 400 });
    }

    const userContext = model && model !== 'Visi modeliai'
      ? `[Vartotojas klausia apie modelį: ${model}]\n\n${message}`
      : message;

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContext },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Atsiprašau, nepavyko sugeneruoti atsakymo.';

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    const message = error instanceof Error ? error.message : 'Vidinė klaida';

    if (message.includes('401') || message.includes('Incorrect API key')) {
      return NextResponse.json({ error: 'API raktas neteisingas' }, { status: 401 });
    }
    if (message.includes('429')) {
      return NextResponse.json({ error: 'Per daug užklausų, pabandykite vėliau' }, { status: 429 });
    }

    return NextResponse.json({ error: `Klaida: ${message}` }, { status: 500 });
  }
}
