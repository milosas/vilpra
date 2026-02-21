'use client';

import { useState } from 'react';
import {
  Search,
  BookOpen,
  AlertCircle,
  HelpCircle,
  FileText,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  Wind,
  Droplet,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface HeatPumpModel {
  id: string;
  brand: string;
  brandColor: string;
  model: string;
  type: string;
  powerRange: string;
  refrigerant: string;
  energyClass: string;
  energyClassColor: string;
  errorCodesCount: number;
  problemsCount: number;
  faqCount: number;
  specs: {
    power: string;
    cop: string;
    noiseLevel: string;
    weight: string;
    dimensions: string;
    refrigerant: string;
  };
  errorCodes: ErrorCode[];
  commonProblems: Problem[];
  faqs: FAQ[];
}

interface ErrorCode {
  code: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  causes: string[];
  solutions: string[];
}

interface Problem {
  title: string;
  description: string;
  frequency: 'high' | 'medium' | 'low';
  solution: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const HEAT_PUMP_MODELS: HeatPumpModel[] = [
  {
    id: 'atlantic-extensa',
    brand: 'Atlantic',
    brandColor: '#3b82f6',
    model: 'Alfea Extensa Duo A.I. R32',
    type: 'Oras-vanduo',
    powerRange: '6-10 kW',
    refrigerant: 'R32',
    energyClass: 'A+++',
    energyClassColor: '#10b981',
    errorCodesCount: 12,
    problemsCount: 5,
    faqCount: 8,
    specs: {
      power: '6-10 kW',
      cop: '4.65 (A7/W35)',
      noiseLevel: '48-52 dB(A)',
      weight: '145 kg',
      dimensions: '1240×500×1250 mm',
      refrigerant: 'R32 (1.9 kg)'
    },
    errorCodes: [
      {
        code: 'E04',
        severity: 'critical',
        description: 'Žemo slėgio apsauga suveikė',
        causes: [
          'Per mažas šaltnešio kiekis sistemoje',
          'Užsikimšęs filtras',
          'Oro išleidimo vožtuvai neatidarinėti',
          'Nuotėkis sistemoje'
        ],
        solutions: [
          'Patikrinti šaltnešio slėgį ir papildyti jei reikia (1.5-2.0 bar šaltai)',
          'Išvalyti ar pakeisti filtrą',
          'Išleisti orą iš sistemos',
          'Ieškoti nuotėkių su nuotėkio detektoriumi'
        ]
      },
      {
        code: 'E07',
        severity: 'critical',
        description: 'Aukšto slėgio apsauga',
        causes: [
          'Užsikimšęs kondensatoriaus šilumokaitlis',
          'Neteisingai veikia ventiliatorius',
          'Per aukšta aplinkos temperatūra',
          'Per daug šaltnešio sistemoje'
        ],
        solutions: [
          'Išvalyti išorinio bloko šilumokaičio žiaunas',
          'Patikrinti ventiliatoriaus veikimą',
          'Įsitikinti, kad pakanka ventiliacijos aplink išorinį bloką',
          'Patikrinti šaltnešio kiekį'
        ]
      },
      {
        code: 'E02',
        severity: 'warning',
        description: 'Apsauginis termostatas',
        causes: [
          'Per aukšta tiekiamo vandens temperatūra',
          'Silpnas cirkuliacinis siurblys',
          'Oro kamšis sistemoje'
        ],
        solutions: [
          'Sumažinti nustatytą temperatūrą',
          'Patikrinti siurblio veikimą ir našumą',
          'Išleisti orą iš sistemos'
        ]
      },
      {
        code: 'E10',
        severity: 'info',
        description: 'Išorinio bloko temperatūros jutiklio klaida',
        causes: [
          'Atjungtas jutiklis',
          'Sugedęs jutiklis',
          'Pažeisti laidai'
        ],
        solutions: [
          'Patikrinti jutiklio prijungimą',
          'Išmatuoti jutiklio varžą (turėtų būti ~10kΩ esant 25°C)',
          'Pakeisti jutiklį jei sugedęs'
        ]
      },
      {
        code: 'E11',
        severity: 'critical',
        description: 'Kompresoriaus perkaitimas',
        causes: [
          'Per mažas šaltnešio kiekis',
          'Kompresoriaus gedimas',
          'Perkrauta sistema'
        ],
        solutions: [
          'Patikrinti šaltnešio lygį',
          'Patikrinti kompresoriaus būklę',
          'Įsitikinti, kad sistema veikia optimaliai'
        ]
      }
    ],
    commonProblems: [
      {
        title: 'Triukšmas žemos temperatūros metu',
        description: 'Išorinis blokas skleidžia padidėjusį triukšmą kai lauko temperatūra nukrenta žemiau -5°C',
        frequency: 'medium',
        solution: 'Normalus reiškinys atšildymo ciklo metu. Jei triukšmas per didelis, patikrinti antivibracinius tvirtinimus ir įsitikinti, kad visi varžtai gerai priveržti.'
      },
      {
        title: 'Dažnas atšildymo ciklas',
        description: 'Sistema dažnai perjungia į atšildymo režimą žiemos metu',
        frequency: 'high',
        solution: 'Patikrinti atšildymo parametrus valdymo panelėje. Įsitikinti, kad oro srautui nėra kliūčių. Gali būti normalu labai drėgnomis sąlygomis.'
      },
      {
        title: 'Nepakankamai šildo',
        description: 'Sistema nepakankamai šildo patalpas esant žemoms lauko temperatūroms',
        frequency: 'medium',
        solution: 'Patikrinti temperatūrų grafiką - gali būti per žemas. Įsitikinti, kad šaltnešio slėgis normalus. Patikrinti ar nėra oro sistemoje. Gali reikėti papildomo elektros teno.'
      }
    ],
    faqs: [
      {
        question: 'Kokia optimali temperatūra šildymo sezonui?',
        answer: 'Rekomenduojama nustatyti 35-40°C grindiniams šildymui ir 45-50°C radiatoriams. Žemesnės temperatūros užtikrina aukštesnį efektyvumą (COP).'
      },
      {
        question: 'Kaip dažnai reikia atlikti techninę priežiūrą?',
        answer: 'Rekomenduojama techninė priežiūra kartą per metus prieš šildymo sezoną. Įskaitant filtrų valymą, šaltnešio slėgio patikrinimą, šilumokaičio valymą.'
      },
      {
        question: 'Ar galima naudoti su esamais radiatoriais?',
        answer: 'Taip, bet reikia įsitikinti, kad radiatoriai pritaikyti žemoms temperatūroms arba naudoti didesnę galią. Optimaliausia su grindinio šildymo sistemomis.'
      }
    ]
  },
  {
    id: 'atlantic-excellia',
    brand: 'Atlantic',
    brandColor: '#3b82f6',
    model: 'Alfea Excellia A.I. TRI',
    type: 'Oras-vanduo',
    powerRange: '11-16 kW',
    refrigerant: 'R32',
    energyClass: 'A++',
    energyClassColor: '#f59e0b',
    errorCodesCount: 14,
    problemsCount: 4,
    faqCount: 6,
    specs: {
      power: '11-16 kW',
      cop: '4.58 (A7/W35)',
      noiseLevel: '52-56 dB(A)',
      weight: '168 kg',
      dimensions: '1350×550×1300 mm',
      refrigerant: 'R32 (2.4 kg)'
    },
    errorCodes: [
      {
        code: 'E01',
        severity: 'critical',
        description: 'Aukšto slėgio jungiklis',
        causes: [
          'Užsikimšęs šilumokaitlis',
          'Neveikia ventiliatorius',
          'Per daug šaltnešio'
        ],
        solutions: [
          'Išvalyti kondensatorių',
          'Patikrinti ventiliatoriaus veikimą',
          'Koreguoti šaltnešio kiekį'
        ]
      },
      {
        code: 'E03',
        severity: 'warning',
        description: 'Antifrizas - temperatūra per žema',
        causes: [
          'Sustojęs cirkuliacinis siurblys',
          'Užšalusi sistema',
          'Per mažas šaltnešio debitas'
        ],
        solutions: [
          'Patikrinti siurblio veikimą',
          'Atšildyti sistemą',
          'Padidinti cirkuliacinius srautus'
        ]
      },
      {
        code: 'E05',
        severity: 'info',
        description: 'Tiekimo temperatūros jutiklio klaida',
        causes: [
          'Atjungtas jutiklis',
          'Sugedęs NTC jutiklis'
        ],
        solutions: [
          'Patikrinti jungčių tvirtinimą',
          'Pakeisti NTC jutiklį'
        ]
      },
      {
        code: 'E08',
        severity: 'critical',
        description: 'Srauto jungiklis neužsidaro',
        causes: [
          'Neveikia cirkuliacinis siurblys',
          'Oro kamšis',
          'Užsikimšęs filtras'
        ],
        solutions: [
          'Patikrinti siurblio maitinimą',
          'Išleisti orą',
          'Išvalyti filtrą'
        ]
      }
    ],
    commonProblems: [
      {
        title: 'TRI režimo perjungimas neveikia',
        description: 'Sistema nekeičia darbo režimo tarp šildymo ir aušinimo automatiškai',
        frequency: 'low',
        solution: 'Patikrinti TRI vožtuvo elektros jungtį ir vožtuvo mechaninę būklę. Gali reikėti vožtuvo kalibravimo arba pakeitimo.'
      },
      {
        title: 'Sutrikusi komunikacija su valdymo bloku',
        description: 'Prarandamas ryšys tarp išorinio ir vidinio blokų',
        frequency: 'medium',
        solution: 'Patikrinti komunikacijos kabelio jungtis. Įsitikinti, kad kabelis yra ekranuotas ir teisingai įžemintas. Patikrinti komunikacijos plokštės būklę.'
      }
    ],
    faqs: [
      {
        question: 'Kuo TRI modelis skiriasi nuo dviejų atskirų sistemų?',
        answer: 'TRI sistemoje vienas išorinis blokas aptarnauja ir šildymą, ir karšto vandens ruošimą, ir aušinimą (jei prijungta). Tai efektyviau ir ekonomiškiau nei kelios atskiros sistemos.'
      },
      {
        question: 'Koks maksimalus šildymo plotas?',
        answer: 'Su 16 kW modeliu galima šildyti apie 200-250 m² gerai izoliuotą namą. Tikslus plotas priklauso nuo pastato izoliacijos ir klimato zonos.'
      }
    ]
  },
  {
    id: 'vaillant-arotherm',
    brand: 'Vaillant',
    brandColor: '#ef4444',
    model: 'aroTHERM Plus',
    type: 'Oras-vanduo',
    powerRange: '4-11 kW',
    refrigerant: 'R290',
    energyClass: 'A+++',
    energyClassColor: '#10b981',
    errorCodesCount: 10,
    problemsCount: 4,
    faqCount: 7,
    specs: {
      power: '4-11 kW',
      cop: '5.14 (A7/W35)',
      noiseLevel: '42-48 dB(A)',
      weight: '125 kg',
      dimensions: '1155×450×1290 mm',
      refrigerant: 'R290 (0.6 kg)'
    },
    errorCodes: [
      {
        code: 'F.701',
        severity: 'critical',
        description: 'Žemo slėgio klaida',
        causes: [
          'Per mažas šaltnešio kiekis',
          'Nuotėkis',
          'Užsikimšęs filtras-džiovintuvas'
        ],
        solutions: [
          'Patikrinti sandarumą',
          'Papildyti šaltnešį (tik su specialiu sertifikatu R290!)',
          'Pakeisti filtro-džiovintuvą'
        ]
      },
      {
        code: 'F.702',
        severity: 'critical',
        description: 'Aukšto slėgio klaida',
        causes: [
          'Nepakanka ventiliacijos',
          'Užsikimšęs kondensatorius',
          'Per daug šaltnešio'
        ],
        solutions: [
          'Užtikrinti 50 cm atstumą iš visų pusių',
          'Išvalyti žiaunas plovikliu',
          'Koreguoti šaltnešio kiekį'
        ]
      },
      {
        code: 'F.705',
        severity: 'warning',
        description: 'Kompresoriaus temperatūros ribojimas',
        causes: [
          'Kompresoriaus perkrova',
          'Blogas šaltnešio cirkuliavimas',
          'Per aukšta kondensinė temperatūra'
        ],
        solutions: [
          'Leisti atvėsti 30 min',
          'Patikrinti sistemos parametrus',
          'Sumažinti tiekimo temperatūrą'
        ]
      },
      {
        code: 'F.732',
        severity: 'info',
        description: 'Srauto jutiklio klaida',
        causes: [
          'Neveikia siurblys',
          'Per mažas debitas',
          'Gedęs srauto jutiklis'
        ],
        solutions: [
          'Patikrinti siurblio veikimą',
          'Padidinti siurblio greitį',
          'Pakeisti srauto jutiklį'
        ]
      }
    ],
    commonProblems: [
      {
        title: 'ActiveCooling režimo triukšmas',
        description: 'Aušinimo režime girdimas neįprastas triukšmas',
        frequency: 'low',
        solution: 'Patikrinti ar teisingai sumontuotas 4-jų krypčių vožtuvas. Įsitikinti, kad visos jungtys sandariai užveržtos. Triukšmas gali būti šaltnešio srautas per vožtuvą - normalu.'
      },
      {
        title: 'VWZ AI integracijos problemos',
        description: 'Nepavyksta prijungti prie Vaillant Smart Control',
        frequency: 'medium',
        solution: 'Patikrinti WiFi ryšio stiprumą išorinio bloko vietoje. Gali reikėti WiFi stiprintuvo. Įsitikinti, kad naudojama naujausia firmware versija.'
      },
      {
        title: 'R290 slėgio svyravimai',
        description: 'Neįprastai svyruoja slėgis darbinio šaltnešio kontūre',
        frequency: 'low',
        solution: 'R290 yra jautresnis temperatūros pokyčiams nei R32. Svyravimai ±0.5 bar yra normalūs. Jei didesni - patikrinti sandarumą ir šaltnešio kiekį.'
      }
    ],
    faqs: [
      {
        question: 'Ar R290 šaltnešis saugus?',
        answer: 'R290 (propanas) yra degus, bet naudojamas labai mažas kiekis (0.6 kg). Sistema suprojektuota su visomis saugos priemonėmis. GWP tik 3, ekologiškiausias pasirinkimas.'
      },
      {
        question: 'Ar galiu pats papildyti šaltnešį?',
        answer: 'NE! R290 darbui reikia specialaus sertifikato darbui su degiais šaltnešiais. Tik kvalifikuotas ir sertifikuotas technikas gali atlikti šaltnešio darbus.'
      },
      {
        question: 'Koks efektyvumas žiemos metu?',
        answer: 'aroTHERM Plus išlaiko aukštą COP net iki -20°C. Esant -10°C lauke, COP vis dar apie 3.0, kas yra puiku. Sistema veikia iki -25°C.'
      }
    ]
  },
  {
    id: 'gree-versati',
    brand: 'GREE',
    brandColor: '#10b981',
    model: 'Versati III',
    type: 'Oras-vanduo',
    powerRange: '4-16 kW',
    refrigerant: 'R32',
    energyClass: 'A++',
    energyClassColor: '#f59e0b',
    errorCodesCount: 15,
    problemsCount: 6,
    faqCount: 5,
    specs: {
      power: '4-16 kW',
      cop: '4.37 (A7/W35)',
      noiseLevel: '50-58 dB(A)',
      weight: '152 kg',
      dimensions: '1200×520×1280 mm',
      refrigerant: 'R32 (2.1 kg)'
    },
    errorCodes: [
      {
        code: 'P01',
        severity: 'critical',
        description: 'Apsaugos relė suveikė',
        causes: [
          'Nestabili elektros įtampa',
          'Netinkamas įžeminimas',
          'Vienos fazės nutrūkimas (trif. modeliams)',
          'Elektros tinklo triukšmai'
        ],
        solutions: [
          'Patikrinti tinklo įtampą - turi būti 230V ±10%',
          'Patikrinti įžeminimo varžą (<1 Ohm)',
          'Įrengti UPS arba įtampos stabilizatorių',
          'Patikrinti fazių simetrišumą (3 fazių modeliams)'
        ]
      },
      {
        code: 'P02',
        severity: 'critical',
        description: 'IPM modulio apsauga',
        causes: [
          'Kompresoriaus viršįtampis',
          'Per aukšta komutacijos temperatūra',
          'IPM modulio gedimas'
        ],
        solutions: [
          'Išjungti 15 min ir bandyti iš naujo',
          'Patikrinti ventiliatorių ir aušinimą',
          'Jei kartojasi - keisti IPM modulį'
        ]
      },
      {
        code: 'E02',
        severity: 'warning',
        description: 'Išorinio oro temperatūros jutiklio klaida',
        causes: [
          'Atjungtas arba sugedęs jutiklis',
          'Pažeisti laidai',
          'Trumpas jungimas'
        ],
        solutions: [
          'Patikrinti jutiklio varžą: ~50kΩ 0°C, ~10kΩ 25°C',
          'Patikrinti laidų būklę',
          'Pakeisti jutiklį jei sugedęs'
        ]
      },
      {
        code: 'E05',
        severity: 'info',
        description: 'Vandens tiekimo temperatūros jutiklio klaida',
        causes: [
          'Atjungtas jutiklis',
          'Blogas kontaktas su vamzdžiu',
          'Sugedęs NTC jutiklis'
        ],
        solutions: [
          'Patikrinti elektrinius kontaktus',
          'Užtikrinti gerą termokontaktą',
          'Pakeisti NTC jutiklį'
        ]
      },
      {
        code: 'P10',
        severity: 'critical',
        description: 'Kompresoriaus perkaitimas',
        causes: [
          'Per mažas šaltnešio kiekis',
          'Kompresoriaus mechaninis gedimas',
          'Blokuotas oras aplink įrenginį'
        ],
        solutions: [
          'Patikrinti šaltnešio slėgį ir kiekį',
          'Užtikrinti pakankamą ventiliaciją',
          'Skubiai iškvietsi servisą - galimas kompresoriaus gedimas'
        ]
      }
    ],
    commonProblems: [
      {
        title: 'WiFi modulio ryšio praradimas',
        description: 'Nuolat prarandamas ryšys su GREE+ aplikacija',
        frequency: 'high',
        solution: 'GREE WiFi modulis gali būti kaprizingas. Įsitikinti, kad WiFi signalas stiprus. Bandyti reset WiFi modulio. Kai kurie naudotojai naudoja atskirą WiFi access point šalia įrenginio.'
      },
      {
        title: 'Inverteris dirba nestabiliai',
        description: 'Dažni įjungimų/išjungimų ciklai',
        frequency: 'medium',
        solution: 'Patikrinti ar tinkamai nustatytas histerezės parametras. Patikrinti ar nėra per didelio šilumos poreikio svyravimo. Gali reikėti koreguoti inverterio PID parametrus per serviso meniu.'
      },
      {
        title: 'Kondensato nutekėjimas',
        description: 'Vanduo po vidiniu bloku šildymo režimu',
        frequency: 'low',
        solution: 'Atvirkštinio ciklo metu gali formuotis kondensatas vidiniame bloke. Patikrinti ar drenažo vamzdelis teisingai įvestas ir neužšalęs. Įrengti šildomas drenažo kabelį jei reikia.'
      }
    ],
    faqs: [
      {
        question: 'Ar veikia su trečių šalių valdikliais?',
        answer: 'GREE Versati III turi Modbus RTU sąsają. Galima integruoti su Home Assistant, OpenHAB ir kitomis smart home sistemomis. Reikia specialaus kabelio ir konfigūracijos.'
      },
      {
        question: 'Kokia minimali darbo temperatūra?',
        answer: 'Sistema veikia iki -25°C išorės temperatūros. Tačiau efektyvumas žemiau -15°C krenta žemiau COP 2.0, gali reikėti papildomo šildymo šaltinio.'
      },
      {
        question: 'Ar galima naudoti su vėdinimo sistema?',
        answer: 'Taip, galima integruoti su rekuperaciniu vėdinimu. Net rekomenduojama - pagerina oro kokybę ir sumažina šiluminius nuostolius.'
      }
    ]
  },
  {
    id: 'sime-argo',
    brand: 'Sime',
    brandColor: '#8b5cf6',
    model: 'Argo Top',
    type: 'Oras-vanduo',
    powerRange: '6-16 kW',
    refrigerant: 'R32',
    energyClass: 'A++',
    energyClassColor: '#f59e0b',
    errorCodesCount: 11,
    problemsCount: 4,
    faqCount: 5,
    specs: {
      power: '6-16 kW',
      cop: '4.42 (A7/W35)',
      noiseLevel: '49-55 dB(A)',
      weight: '138 kg',
      dimensions: '1180×485×1245 mm',
      refrigerant: 'R32 (1.8 kg)'
    },
    errorCodes: [
      {
        code: 'AL01',
        severity: 'critical',
        description: 'Aukšto slėgio apsauga',
        causes: [
          'Nepakankama ventiliacija',
          'Užsikimšęs šilumokaitlis',
          'Neveikia ventiliatorius',
          'Per daug šaltnešio'
        ],
        solutions: [
          'Užtikrinti laisvą oro judėjimą',
          'Išvalyti išorinio bloko žiaunas',
          'Patikrinti ventilatoriaus veikimą ir jungtis',
          'Patikrinti šaltnešio kiekį (profesionalui)'
        ]
      },
      {
        code: 'AL02',
        severity: 'critical',
        description: 'Žemo slėgimo apsauga',
        causes: [
          'Šaltnešio nuotėkis',
          'Užsikimšęs filtras',
          'Blogas cirkuliacinis debitas'
        ],
        solutions: [
          'Ieškoti nuotėkių',
          'Išvalyti filtrus',
          'Patikrinti siurblio darbą'
        ]
      },
      {
        code: 'AL05',
        severity: 'warning',
        description: 'Srauto jungiklio klaida',
        causes: [
          'Sustojęs cirkuliacinis siurblys',
          'Oro kamšis',
          'Per mažas vandens debitas'
        ],
        solutions: [
          'Patikrinti siurblio maitinimą ir veikimą',
          'Išleisti orą iš šildymo sistemos',
          'Padidinti siurblio greitį'
        ]
      },
      {
        code: 'AL10',
        severity: 'info',
        description: 'NTC jutiklio klaida (tiekimas)',
        causes: [
          'Sugedęs NTC jutiklis',
          'Atjungti laidai',
          'Blogas kontaktas'
        ],
        solutions: [
          'Išmatuoti jutiklio varžą',
          'Patikrinti laidų jungtis',
          'Pakeisti jutiklį jei reikia'
        ]
      }
    ],
    commonProblems: [
      {
        title: 'Valdymo skydelio komunikacijos klaida',
        description: 'Netinkamai veikia ryšys tarp išorinio ir vidinio blokų',
        frequency: 'medium',
        solution: 'Patikrinti komunikacijos kabelio jungtis abiejuose blokuose. Sime naudoja 3-jų laidų protokolą - įsitikinti, kad polaritetas teisingas. Kabelis turėtų būti ekranuotas.'
      },
      {
        title: 'Netiksli temperatūros reguliacija',
        description: 'Sistema perša arba nepasieka nustatytos temperatūros',
        frequency: 'medium',
        solution: 'Kalibruoti kambario termostato jutiklį. Patikrinti histerezės nustatymus - rekomenduojama 0.5-1°C. Gali reikėti koreguoti PID parametrus per serviso meniu.'
      },
      {
        title: 'Karšto vandens ruošimo vėlavimas',
        description: 'Ilgai trunka kol karštas vanduo pasiekia norimą temperatūrą',
        frequency: 'low',
        solution: 'Patikrinti karšto vandens prioriteto nustatymus. Įsitikinti, kad boilerio šilumokaitis švarus. Gali reikėti didesnės galios nustatymo KV režimu.'
      }
    ],
    faqs: [
      {
        question: 'Ar Sime Argo Top patikimas?',
        answer: 'Sime (Italija) yra patikimas gamintojas su daug metų patirtimi. Argo Top serija yra optimali kaina/kokybe santykiu. Naudoja standartines dalis, servisas nesudėtingas.'
      },
      {
        question: 'Kokia garantija?',
        answer: 'Standartinė gamintojo garantija 2 metai. Kai kurie tiekėjai siūlo išplėstinę 5 metų garantiją kompresoriniam blokui. Rekomenduojama metiné priežiūra garantijos išsaugojimui.'
      },
      {
        question: 'Ar galima prijungti saulės kolektorius?',
        answer: 'Taip, Argo Top turi integracijos galimybę su saulės kolektoriais karšto vandens ruošimui. Tai pagerina bendrą sistemos efektyvumą vasaros metu.'
      }
    ]
  }
];

type Tab = 'specs' | 'errors' | 'problems' | 'faq';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<HeatPumpModel | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('specs');
  const [errorSearchQuery, setErrorSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  const filteredModels = HEAT_PUMP_MODELS.filter(model =>
    model.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" style={{ color: '#f59e0b' }} />;
      case 'info':
        return <Info className="w-4 h-4" style={{ color: '#3b82f6' }} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { border: '#ef444430', bg: '#ef444410' };
      case 'warning':
        return { border: '#f59e0b30', bg: '#f59e0b10' };
      case 'info':
        return { border: '#3b82f630', bg: '#3b82f610' };
      default:
        return { border: '#e5e7eb', bg: '#fff' };
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredErrors = selectedModel?.errorCodes.filter(error =>
    error.code.toLowerCase().includes(errorSearchQuery.toLowerCase()) ||
    error.description.toLowerCase().includes(errorSearchQuery.toLowerCase())
  ) || [];

  if (selectedModel) {
    return (
      <div className="px-5 md:px-10 lg:px-12 py-6 md:py-8 pt-16 lg:pt-8 space-y-6" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header with Back Button */}
        <div className="card rounded-2xl p-4 md:p-6" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button
                onClick={() => {
                  setSelectedModel(null);
                  setActiveTab('specs');
                  setErrorSearchQuery('');
                  setExpandedFAQs([]);
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:shadow-sm transition-all"
                style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
              >
                <X className="w-5 h-5" style={{ color: '#1a1a1a' }} />
              </button>

              <div
                className="px-4 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: selectedModel.brandColor }}
              >
                {selectedModel.brand}
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#1a1a1a' }}>{selectedModel.model}</h2>
                <p className="text-sm md:text-base" style={{ color: '#6b7280' }}>
                  {selectedModel.type} • {selectedModel.powerRange} • {selectedModel.refrigerant}
                </p>
              </div>
            </div>

            <div
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: selectedModel.energyClassColor }}
            >
              {selectedModel.energyClass}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto flex-nowrap whitespace-nowrap gap-2">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'specs' ? 'text-white' : ''
              }`}
              style={activeTab === 'specs'
                ? { backgroundColor: '#E07A5F', borderBottom: '2px solid #E07A5F' }
                : { backgroundColor: '#f9fafb', color: '#6b7280' }
              }
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Specifikacijos
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'errors' ? 'text-white' : ''
              }`}
              style={activeTab === 'errors'
                ? { backgroundColor: '#E07A5F', borderBottom: '2px solid #E07A5F' }
                : { backgroundColor: '#f9fafb', color: '#6b7280' }
              }
            >
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Klaidų kodai ({selectedModel.errorCodesCount})
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'problems' ? 'text-white' : ''
              }`}
              style={activeTab === 'problems'
                ? { backgroundColor: '#E07A5F', borderBottom: '2px solid #E07A5F' }
                : { backgroundColor: '#f9fafb', color: '#6b7280' }
              }
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Problemos ({selectedModel.problemsCount})
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'faq' ? 'text-white' : ''
              }`}
              style={activeTab === 'faq'
                ? { backgroundColor: '#E07A5F', borderBottom: '2px solid #E07A5F' }
                : { backgroundColor: '#f9fafb', color: '#6b7280' }
              }
            >
              <HelpCircle className="w-4 h-4 inline mr-2" />
              D.U.K. ({selectedModel.faqCount})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="card rounded-2xl p-4 md:p-6" style={{ border: '1px solid #e5e7eb' }}>
          {activeTab === 'specs' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                <Zap className="w-5 h-5" style={{ color: '#E07A5F' }} />
                Techninės Specifikacijos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>Galia</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.power}</span>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4" style={{ color: '#10b981' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>COP</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.cop}</span>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-4 h-4" style={{ color: '#06b6d4' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>Triukšmo lygis</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.noiseLevel}</span>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-4 h-4" style={{ color: '#3b82f6' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>Šaltnešis</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.refrigerant}</span>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4" style={{ color: '#6b7280' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>Svoris</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.weight}</span>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" style={{ color: '#6b7280' }} />
                    <span className="text-sm" style={{ color: '#6b7280' }}>Matmenys</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>{selectedModel.specs.dimensions}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                  <AlertCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
                  Klaidų Kodai
                </h3>

                <div style={{ position: 'relative', width: '16rem' }}>
                  <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#999', pointerEvents: 'none', zIndex: 1 }} />
                  <input
                    type="text"
                    value={errorSearchQuery}
                    onChange={(e) => setErrorSearchQuery(e.target.value)}
                    placeholder="Ieškoti klaidos..."
                    className="input"
                    style={{ paddingLeft: '44px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', color: '#1a1a1a' }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredErrors.map((error, idx) => {
                  const colors = getSeverityColor(error.severity);

                  return (
                    <div
                      key={idx}
                      className="rounded-xl p-4"
                      style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.bg }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {getSeverityIcon(error.severity)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg" style={{ color: '#1a1a1a' }}>{error.code}</span>
                            <span className="px-2 py-0.5 rounded text-xs capitalize" style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}>
                              {error.severity === 'critical' ? 'Kritiška' : error.severity === 'warning' ? 'Įspėjimas' : 'Info'}
                            </span>
                          </div>
                          <p className="font-medium mb-3" style={{ color: '#1a1a1a' }}>{error.description}</p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>Galimos priežastys:</h4>
                              <ul className="space-y-1">
                                {error.causes.map((cause, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#6b7280' }}>
                                    <span style={{ color: '#f59e0b' }} className="mt-1">•</span>
                                    <span>{cause}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>Sprendimai:</h4>
                              <ul className="space-y-1">
                                {error.solutions.map((solution, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#6b7280' }}>
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />
                                    <span>{solution}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
                Dažniausios Problemos
              </h3>

              <div className="space-y-4">
                {selectedModel.commonProblems.map((problem, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-4 hover:shadow-sm transition-all"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold flex-1" style={{ color: '#1a1a1a' }}>{problem.title}</h4>
                      <span className="text-xs font-medium" style={{ color: getFrequencyColor(problem.frequency) }}>
                        {problem.frequency === 'high' ? 'Dažna' : problem.frequency === 'medium' ? 'Vidutinė' : 'Reta'}
                      </span>
                    </div>

                    <p className="text-sm mb-3" style={{ color: '#6b7280' }}>{problem.description}</p>

                    <div className="rounded-lg p-3" style={{ backgroundColor: '#10b98110', border: '1px solid #10b98130' }}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />
                        <div>
                          <span className="text-xs font-semibold block mb-1" style={{ color: '#10b981' }}>Sprendimas:</span>
                          <p className="text-sm" style={{ color: '#1a1a1a' }}>{problem.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#1a1a1a' }}>
                <HelpCircle className="w-5 h-5" style={{ color: '#8b5cf6' }} />
                Dažnai Užduodami Klausimai
              </h3>

              <div className="space-y-3">
                {selectedModel.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden hover:shadow-sm transition-all"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left"
                    >
                      <span className="font-medium pr-4" style={{ color: '#1a1a1a' }}>{faq.question}</span>
                      {expandedFAQs.includes(idx) ? (
                        <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: '#E07A5F' }} />
                      ) : (
                        <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: '#6b7280' }} />
                      )}
                    </button>

                    {expandedFAQs.includes(idx) && (
                      <div className="px-4 pb-4 pt-1 animate-fade-in" style={{ borderTop: '1px solid #e5e7eb' }}>
                        <p className="leading-relaxed" style={{ color: '#6b7280' }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-12 py-6 md:py-8 pt-16 lg:pt-8 space-y-6" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div className="card rounded-2xl p-4 md:p-6" style={{ border: '1px solid #e5e7eb' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>Žinių Bazė</h2>
              <p className="text-sm" style={{ color: '#6b7280' }}>Šilumos siurblių dokumentacija ir pagalba</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#999', pointerEvents: 'none', zIndex: 1 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ieškoti modelio..."
            className="input"
            style={{ paddingLeft: '44px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', color: '#1a1a1a' }}
          />
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="card rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
            style={{ border: '1px solid #e5e7eb' }}
          >
            {/* Card Header */}
            <div className="p-4 md:p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="px-3 py-1.5 rounded-lg text-white font-semibold text-sm"
                  style={{ backgroundColor: model.brandColor }}
                >
                  {model.brand}
                </div>

                <div
                  className="px-2 py-1 rounded-md text-white font-bold text-xs"
                  style={{ backgroundColor: model.energyClassColor }}
                >
                  {model.energyClass}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: '#1a1a1a' }}>
                {model.model}
              </h3>

              <div className="flex items-center gap-3 text-sm mb-4" style={{ color: '#6b7280' }}>
                <span className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  {model.type}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {model.powerRange}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-1 rounded-md text-xs" style={{ backgroundColor: '#3b82f620', color: '#3b82f6', border: '1px solid #3b82f630' }}>
                  {model.refrigerant}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg p-2 text-center" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="text-lg font-bold" style={{ color: '#ef4444' }}>{model.errorCodesCount}</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>Klaidos</div>
                </div>

                <div className="rounded-lg p-2 text-center" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="text-lg font-bold" style={{ color: '#f59e0b' }}>{model.problemsCount}</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>Problemos</div>
                </div>

                <div className="rounded-lg p-2 text-center" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  <div className="text-lg font-bold" style={{ color: '#8b5cf6' }}>{model.faqCount}</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>D.U.K.</div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setSelectedModel(model)}
                className="py-2.5 px-8 text-white rounded-xl font-medium hover:opacity-90 transition-opacity btn-accent"
                style={{ backgroundColor: '#E07A5F' }}
              >
                Peržiūrėti
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="card rounded-2xl p-12 text-center" style={{ border: '1px solid #e5e7eb' }}>
          <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: '#6b7280' }} />
          <p style={{ color: '#6b7280' }}>Modelių nerasta</p>
        </div>
      )}
    </div>
  );
}
