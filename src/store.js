import { v4 as uuidv4 } from 'uuid'
import { db } from './lib/firebase'
import { ref, get, set, remove } from 'firebase/database'

// ── Seed data (används om databasen är tom) ──────────────────────────────────

const SEED_ARTICLES = [
  // ── INSIGHT ARTICLES ──────────────────────────────────────────────────────
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '01 Träning & Fysisk Status',
    title: 'DIN STARKASTE',
    titleAccent: 'HÄVSTÅNG.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Träning är inte bara kaloriförbränning. Det är den kraftfullaste biologiska signal vi känner till – en signal som omprogrammerar allt från din cellförnyelse till din kognitiva förmåga.',
      col1: 'Varför är träning det första vi tittar på? Svaret ligger i dess förmåga att reglera kroppens övriga system. Forskning visar att regelbunden fysisk aktivitet sänker risken för för tidig död mer än nästan alla andra enskilda livsstilsfaktorer. Den ökar sömnkvaliteten, sänker stresshormoner och fungerar som en katalysator för hela din livsstilsprofil.',
      col2: 'Genom att belasta kroppen kontrollerat tvingas hjärtat och musklerna att anpassa sig. Denna anpassning – mätt som VO₂ Max och muskelmassa – ger oss en direkt bild av din biologiska ålder, inte den kronologiska. En vältränad 50-åring kan ha ett hjärta och en metabolism som en 35-åring.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Kondition:',
      titleLine2: 'Motorn för långlevnad',
      content: 'Kondition (mätt som VO₂ Max) är den enskilt starkaste indikatorn på framtida hälsa och livslängd – starkare än blodtryck, kolesterol eller BMI. Det mäter hur effektivt din kropp kan ta upp och använda syre vid maximal ansträngning. Forskning från Mayo Clinic visar att varje steg upp i konditionsnivå minskar risken för hjärt-kärlsjukdom med 15–20 %. VO₂ Max är i bokstavlig mening din biologiska livskraft.',
      quote: 'Att förbättra sin kondition från "Låg" till "Medel" är det enskilt största steget du kan ta för att förlänga ett friskt, aktivt liv – och det tar bara 8–12 veckor av konsekvent träning att märka effekten.',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Fysisk arkitektur',
      title: 'Muskelmassa:',
      titleLine2: 'Din hälsoreserver',
      content: 'Muskelmassa handlar inte bara om styrka – det är metabolt aktiv vävnad med en central roll i kroppens energiomsättning. Muskler tar upp glukos utan insulin under träning, vilket skyddar mot typ 2-diabetes. De producerar myokiner – signalproteiner som sänker inflammation och skyddar hjärnan. Att bibehålla god muskelmassa, framför allt överkropp och core, är en av de viktigaste investeringarna för en aktiv och frisk ålderdom.',
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på träning?',
      items: [
        { number: '01', title: 'Mental Skärpa', content: 'Träning ökar blodflödet till prefrontala cortex och frigör BDNF – hjärnans eget gödningsmedel – vilket förbättrar minne, kreativitet och beslutsfattande med upp till 20 % efter ett enda pass.' },
        { number: '02', title: 'Hormonell Reglering', content: 'Fysisk aktivitet sänker kortisol och ökar frisättningen av dopamin och endorfiner. Regelbunden träning är lika effektivt som antidepressiva vid mild-måttlig depression, utan biverkningar.' },
        { number: '03', title: 'Metabol Kraft', content: 'Tränade muskler fungerar som glukossänkor och förbättrar insulinkänsligheten. Detta stabiliserar energinivån under hela dagen och minskar risken för blodsockersvängningar.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '02 Sömn & Återhämtning',
    title: 'DIN BIOLOGISKA',
    titleAccent: 'RESTAURERING.',
    heroImage: 'https://images.unsplash.com/photo-1541781713364-70ca264d9595?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Sömn är inte passiv tid. Det är ett aktivt biologiskt program – utan det kollapsar immunförsvaret, skjuter blodsockret upp och hjärnan städar inte bort de proteiner som annars orsakar Alzheimers.',
      col1: 'Varför är sömnen fundamentet? Under de timmar du sover genomgår kroppen processer som är helt omöjliga att replikera i vaket tillstånd: tillväxthormon frisätts och reparerar vävnad, immunsystemet producerar cytokiner och hjärnan konsoliderar dagens minnen. Sömnbrist under bara en natt försämrar kognitiv funktion lika mycket som en promilles alkoholpåverkan.',
      col2: 'Sömnkvaliteten påverkar direkt din förmåga att tillgodogöra dig effekterna av träning och kost. Utan djupsömn frigörs inte tillräckligt med tillväxthormon för muskelreparation. Utan REM-sömn bearbetas inte stress och känslor. Sömnens arkitektur – fördelningen mellan olika faser – är lika viktig som antalet timmar.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Djupsömn:',
      titleLine2: 'Hjärnans tvättmaskin',
      content: 'Under djupsömnen (slow-wave sleep) aktiveras det glymphatiska systemet: hjärncellerna krymper med upp till 60 %, vilket tillåter ryggmärgsvätska att skölja igenom vävnaden och rensa bort metabola slaggprodukter – inklusive amyloid-beta, det protein som ackumuleras vid Alzheimers sjukdom. Det är bokstavligen hjärnans nattliga tvättmaskin. Utan tillräcklig djupsömn hinner inte denna rensning fullbordas.',
      quote: 'Att prioritera sömnen är inte lättja. Det är den smartaste biologiska investering du kan göra varje dygn – och den enda aktivitet som gör varje annan aktivitet bättre.',
      image: 'https://images.unsplash.com/photo-1511295742364-917544627d21?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Biokemisk arkitektur',
      title: 'Hormonell harmoni:',
      titleLine2: 'Stress & Hunger',
      content: 'Under sömnen regleras balansen mellan kortisol (stresshormon), ghrelin (hungersignal) och leptin (mättnadssignal). Vid sömnbrist stiger kortisol, ghrelin ökar och leptin minskar – en biologisk storm som driver både stressrespons och ohälsosamt ätbeteende. Studier visar att personer med regelbunden sömnbrist äter i genomsnitt 300 extra kalorier per dag utan att uppleva mer hunger. En god natt är den mest underskattade koststrategin.',
      image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på sömn?',
      items: [
        { number: '01', title: 'Fysisk Läkning', content: 'Under djupsömnen frisätts upp till 70 % av det dagliga tillväxthormonet, som reparerar muskelvävnad, stärker immunsystemet och håller huden och organen friska.' },
        { number: '02', title: 'Emotionell Resiliens', content: 'REM-sömnen fungerar som hjärnans emotionella terapi. Den processar svåra upplevelser och sänker amygdalas reaktivitet, vilket gör dig markant mer motståndskraftig mot stress dagen efter.' },
        { number: '03', title: 'Metabol Kraft', content: 'God sömn höjer insulinkänsligheten och stabiliserar blodsockret. Bara en natt med sömnbrist (under 6 timmar) försämrar kroppens glukoshantering på nivåer jämförbara med prediabetes.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '03 Kost & Metabol Kraft',
    title: 'DIN METABOLA',
    titleAccent: 'STABILITET.',
    heroImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Maten är mer än kalorier. Det är biokemisk information som varje dag instruerar dina gener att antingen skydda dig eller sakta förstöra dig.',
      col1: 'Varför är kosten en hörnsten i din profil? Rätt näring är inte en diet – det är ett system för att stabilisera kroppens fundamentala processer. Varje måltid är ett tillfälle att antingen hålla inflammationen låg och insulinkänsligheten hög, eller att driva kroppen mot kronisk belastning. Skillnaden syns direkt i blodet.',
      col2: 'Blodmarkörer som fasteglukos och lipidprofil fungerar som en direkt rapport om hur kosten påverkar kroppen inifrån. De ljuger inte. De berättar om metabol flexibilitet, kärlhälsa och inflammatorisk belastning – och de kan förändras dramatiskt på bara 4–8 veckor av medvetna kostval.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Glukos:',
      titleLine2: 'Din energireglering',
      content: 'Fasteglukos mäter hur effektivt kroppen hanterar blodsocker efter en natt utan mat. Ett optimalt värde ligger under 5.6 mmol/L och indikerar god insulinkänslighet. Värden mellan 5.6–7.0 (prediabetes-zonen) innebär att cellerna börjar tappa sin förmåga att ta upp glukos effektivt – en process som pågår tyst i år innan det syns som symtom. Det goda: detta är ett av de mest responsiva biomarkörerna – rätt kostval ger mätbar förbättring inom veckor.',
      quote: 'Stabilt blodsocker är inte bara en diabetesfråga – det är grunden för jämn kognition, stabilt humör och hållbar energi. Det är hjärnans och kroppens gemensamma bränslesystem.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Blodfetter',
      title: 'Lipidprofilen:',
      titleLine2: 'Hjärtats skydd',
      content: 'Lipidprofilen mäter balansen mellan LDL (det transportburna fettet) och HDL (det kärlskyddande fettet). En hög LDL/HDL-kvot indikerar ökad risk för plackbildning i artärerna, medan en låg kvot är ett av de starkaste skydden mot hjärtinfarkt. Viktigt att förstå: det är inte bara LDL-nivån som avgör risken utan hela bilden – partikelstorleken, HDL:s funktionalitet och triglyceridnivåerna. En antiinflammatorisk kost rik på omättade fetter, fiber och färgglada grönsaker förbättrar hela profilen.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på kosten?',
      items: [
        { number: '01', title: 'Stabil Energi', content: 'Lågglykemisk mat – proteiner, fibrer och hälsosamma fetter – jämnar ut blodsockerkurvan och eliminerar de energidips som saboterar koncentration och motivation efter lunch.' },
        { number: '02', title: 'Långsiktigt Skydd', content: 'En antiinflammatorisk kost rik på omega-3, polyphenoler och fiber sänker den systemiska inflammationen som driver hjärtsjukdom, cancer och kognitiv nedgång.' },
        { number: '03', title: 'Effektiv Återhämtning', content: 'Protein och leucin (aminosyra) signalerar till muskelcellerna att starta proteinsyntesen. Utan tillräckligt kostprotein begränsar du din förmåga att bygga och bibehålla muskelmassa oavsett hur hårt du tränar.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '04 Stress & Återhämtning',
    title: 'DIN INRE',
    titleAccent: 'RESILIENS.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Stress i sig är inte farlig – det är frånvaron av återhämtning som dödar. Kroppen är byggd för att hantera toppar. Den är inte byggd för att aldrig komma ned.',
      col1: 'Varför är stresshantering ett prioriterat område? Kronisk, låggradig stress är en av de mest underskattade hälsoriskerna i modern tid. Den driver upp kortisolet dygnet runt, vilket försämrar immunförsvaret, bryter ned muskelmassa, stör sömnarkitekturen och accelererar cellulär åldrande. Vad som känns som "lite stressigt" i vardagen är för kroppen en konstant biologisk kris.',
      col2: 'Det parasympatiska nervsystemet – kroppens återhämtningssystem – behöver aktiveras aktivt, inte bara "råka" aktiveras. HRV (hjärtrytmvariabilitet) är ett av de bästa objektiva måtten på hur väl detta sker. En hög HRV innebär att nervsystemet snabbt kan crescha upp vid stress och just lika snabbt varva ned – det är bilden av biologisk resiliens.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Blodtryck:',
      titleLine2: 'Hjärtats kvitto',
      content: 'Blodtrycket är stressens kvitto. Ett optimalt värde är under 120/80 mmHg – vid detta tryck arbetar hjärtat utan onödigt motstånd och kärlväggarna utsätts inte för mekanisk belastning. Vid kronisk stress håller det sympatiska nervsystemet kärlen kontraherade och trycket förhöjt, dygnet runt. Varje enhet blodtrycket sänks minskar risken för stroke med 5–10 % och hjärtinfarkt med 7–10 %. Det är direkt mätbar effekt av bättre stresshantering.',
      quote: 'Att lära sig växla ner nervsystemet aktivt – genom andning, rörelse eller mindfulness – är inte ett lyxigt tillägg till ditt schema. Det är medicinsk prevention av de vanligaste dödsorsakerna i Sverige.',
      image: 'https://images.unsplash.com/photo-1499209974431-9dac32a3a60d?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Mental arkitektur',
      title: 'Återhämtning:',
      titleLine2: 'Nervsystemets paus',
      content: 'Det parasympatiska nervsystemet – "bromsen" i kroppens autonoma system – aktiveras inte av sig självt i en stressig livsstil. Det behöver aktiv stimulering: djup andning (speciellt lång utandning), natur, fysisk rörelse och social samhörighet är alla bevisade aktivatorer. HRV-mätning visar i realtid hur väl detta sker. Ju fler återhämtningsfönster som byggs in i vardagen, desto snabbare återhämtar sig kroppen – och desto högre HRV-baseline uppnås över tid.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på återhämtning?',
      items: [
        { number: '01', title: 'Sänkt inflammation', content: 'Kronisk stress aktiverar NF-kB, en transkriptionsfaktor som sätter igång inflammatoriska processer i hela kroppen. Stressreducering är anti-inflammatorisk behandling – utan biverkningar.' },
        { number: '02', title: 'Bättre Beslutsfattande', content: 'Höga kortisolnivåer krymper prefrontala cortex – hjärnregionen för planering och rationellt tänkande – och stärker amygdala. Sänkt stress ger bokstavligen en bättre hjärna tillbaka.' },
        { number: '03', title: 'Hjärtat i vila', content: 'Parasympatisk dominans – uppnådd genom aktiv återhämtning – sänker vilopuls och diastoliskt blodtryck. Det är hjärtats semester, och det behövs lika regelbundet som träningen.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '05 Relationer & Social Hälsa',
    title: 'DITT SOCIALA',
    titleAccent: 'SKYDDSNÄT.',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Ensamhet är lika dödlig som att röka 15 cigaretter om dagen. Det är inte metafor – det är vad decennier av forskning på dödlighetsstatistik visar.',
      col1: 'Varför mäter vi relationer i en hälsokontroll? Svaret finns i biologin. Sociala band reglerar kroppens stressrespons via oxytocinssystemet och dämpar HPA-axelns kortisolproduktion. Isolering driver upp det inflammatoriska svaret på samma sätt som en kronisk infektion. Dina relationer är inte ett tillägg till din hälsa – de är en biologisk förutsättning för den.',
      col2: 'Forskningen är konsekvent: personer med starka sociala nätverk lever 3–7 år längre, har lägre blodtryck, starkare immunförsvar och återhämtar sig snabbare från sjukdom. Oxytocin – det hormon som frigörs vid meningsfull kontakt – sänker kortisol, minskar smärtupplevelse och förbättrar hjärtfunktionen. Det är kroppens naturliga läkningshormon.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Social Buffert:',
      titleLine2: 'Motvikt till stress',
      content: 'När vi upplever äkta socialt stöd aktiveras det parasympatiska nervsystemet och bromsar kortisolet. Forskning från Carnegie Mellon University visade att personer med breda sociala nätverk var fyra gånger mer motståndskraftiga mot förkylningar när de utsattes för rhinovirus. Mekanismen är enkel: socialt stöd sänker det kroniska inflammatoriska tillståndet som hämmar immunsvaret. Dina relationer optimerar bokstavligen din biologi.',
      quote: 'Social samhörighet är en starkare prediktor för biologisk livslängd än rökning, övervikt, fysisk inaktivitet och luftföroreningar – enligt den mest heltäckande metaanalysen av 148 studier med 300 000 deltagare.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Hälsoarkitektur',
      title: 'Meningsfullhet:',
      titleLine2: 'Livets sammanhang',
      content: 'Aaron Antonovskys KASAM-begrepp (känsla av sammanhang) identifierar tre faktorer som driver hälsa: begriplighet, hanterbarhet och meningsfullhet. Alla tre bottnar i relationer. Att ha människor att dela utmaningar med ökar upplevelsen av begriplighet ("detta hanterar vi tillsammans"), hanterbarhet ("du är inte ensam med det") och meningsfullhet ("det vi gör spelar roll för andra"). KASAM är en av de starkaste prediktorerna för självskattad hälsa och frånvaro av sjukdom.',
      image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför vårda relationer?',
      items: [
        { number: '01', title: 'Mental Hälsa', content: 'Meningsfull social kontakt triggar oxytocinfrisättning, som direkt motverkar kortisolets destruktiva effekter på immunceller, kärlväggar och hjärnans hippocampus.' },
        { number: '02', title: 'Immunförsvar', content: 'En Harvardstudie som pågick i 80 år fann att relationskvalitet – inte rikedom, berömmelse eller gener – var den starkaste prediktorn för ett långt och lyckligt liv. Nätverkets djup avgör mer än dess bredd.' },
        { number: '03', title: 'Långsiktig Hållbarhet', content: 'Känslan av tillhörighet sänker systemisk inflammation och minskar risken för hjärtsjukdom, demens och autoimmuna tillstånd – de sjukdomar som kostar flest levnadsår i Sverige.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '06 Balans arbete/fritid',
    title: 'DIN HÅLLBARA',
    titleAccent: 'VARDAG.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Hjärnan kan inte prestera på topp utan återhämtning, precis som muskeln inte kan växa utan vila. Det är inte en filosofi – det är fysiologi.',
      col1: 'Varför mäter vi balansen mellan arbete och fritid? Psykologisk distansering – förmågan att mentalt lämna jobbet när du lämnar det fysiskt – är ett av de mest välstuderade skydden mot utmattning. Professor Sabine Sonnentag har i decennier forskat på recovery från arbete och visar att de som lyckas koppla av ordentligt under kvällen presterar markant bättre nästa dag, är mer kreativa och sjukskriver sig sällan.',
      col2: 'Utan fungerande psykologisk distansering tillbringar hjärnan fritiden i ett halvstressat tillstånd – Default Mode Network aktiveras och maler på arbetsproblem. Det är inte vila. Det är lågaktivitetsstress. Konsekvenserna syns i kortisol, sömnkvalitet och HRV. Fungerande fritid är mätbar hälsa.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Gränssättning:',
      titleLine2: 'Skydda din återhämtning',
      content: 'Psykologisk distansering är förmågan att aktivt lämna arbetsrollen mentalt – inte bara fysiskt. Forskning visar att det är den viktigaste mekanismen för nattlig återhämtning. När distanseringen misslyckas förblir kortisolet förhöjt, sömnens djupfaser störs och morgondagens kognitiva kapacitet minskar. Konkret syns det som att man vaknar utan att känna sig utvilad trots tillräckliga timmar. Att skapa tydliga mentala och fysiska ritualer som markerar övergången från arbete till fritid är inte en lyx – det är en biologisk nödvändighet.',
      quote: 'Förmågan att koppla bort är en kompetens, inte en personlighetsegenskap. Den kan tränas med samma konsekvens som konditionsträning – och ger lika mätbara resultat i form av sänkt kortisol och förbättrad sömnkvalitet.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Hälsoarkitektur',
      title: 'Aktiv Fritid:',
      titleLine2: 'Meningsfull rekreation',
      content: 'Aktiv fritid – hobbys, rörelse, socialt umgänge – återhämtar hjärnan på ett sätt som passiv skärmkonsumtion aldrig kan. Forskning på flow-tillstånd (Csikszentmihalyi) visar att aktiviteter som kräver engagemang men sker utanför kravzonen skapar maximal psykologisk återhämtning. En timme med ett genuint intresse laddar om hjärnan mer effektivt än fyra timmar av TV-tittande. Din fritid är din prestation av imorgon.',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på balans?',
      items: [
        { number: '01', title: 'Förebygger Utmattning', content: 'Tydliga pauser förhindrar ackumulering av mental utmattning. Utan dem eroderar beslutskapaciteten gradvis – ett fenomen känt som "decision fatigue" – med konsekvensen att viktiga beslut fattas sämre sent på dagen.' },
        { number: '02', title: 'Ökad Kreativitet', content: 'Under oplanerad vila aktiveras Default Mode Network i ett positivt läge – hjärnan kopplar ihop orelaterade idéer och löser problem den inte kunde lösa under fokuserat arbete. Vilan är en del av tänkandet.' },
        { number: '03', title: 'Bättre Sömnkvalitet', content: 'Psykologisk distansering kvällen före sänggående korrelerar starkt med kortare insomningstid och mer tid i djupsömn – den fas då kroppen reparerar och hjärnan rensar sig.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '07 Rökning & Tobaksbruk',
    title: 'REN BIOLOGISK',
    titleAccent: 'KAPACITET.',
    heroImage: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Tobak är den enda lagliga produkten som dödar hälften av sina regelbundna användare. Rökfrihet är inte en prestation – det är baslinjens återupprättande.',
      col1: 'Varför är tobaksfrihet en hörnsten i hälsoprofilen? Rökning skadar kärlendotelet – den tunna innerklädnaden i blodkärlen – och driver en inflammatorisk kaskad som accelererar åldrande av hjärta, lungor och hjärna. Varje cigarett ger en kortvarig kärlsammandragning som varar i 30–45 minuter. Den rökfria kroppen börjar reparera dessa skador inom timmar efter sista cigaretten – och inom 5–10 år är risken för hjärtinfarkt halverad.',
      col2: 'Effekterna av tobak syns i hela kroppen – från blodtrycket och blodkärlen till lungkapaciteten och immunförsvaret. En rökfri livsstil är fundamentet som möjliggör att övriga hälsovärden kan förbättras och bibehållas över tid.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Kärlhälsa:',
      titleLine2: 'Elasticitet och flöde',
      content: 'Rökning orsakar omedelbar kärlsammandragning och skadar kärlväggarna över tid. Rökfrihet däremot bidrar till ett lägre blodtryck och bättre kärltonus – vilket innebär att hjärtat kan arbeta effektivt utan onödigt motstånd och den cirkulatoriska hälsan bevaras långsiktigt.',
      quote: 'Att förbli rökfri är den mest kraftfulla åtgärden för att skydda artärerna och säkerställa en optimal syresättning av kroppens alla organ.',
      image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Syreupptagningsförmåga',
      title: 'Kondition:',
      titleLine2: 'Maximal potential',
      content: 'Konditionsförmågan är direkt beroende av lungornas kapacitet och blodets förmåga att transportera syre. Utan tobak är hemoglobinet fullt tillgängligt – inte blockerat av kolmonoxid – vilket innebär att musklerna får maximalt bränsle under träning och återhämtning sker snabbare.',
      image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför förbli rökfri?',
      items: [
        { number: '01', title: 'Hjärtat i balans', content: 'Utan nikotin normaliseras noradrenalinbalansen och vilopulsen sjunker. Kärlen relaxar och blodtrycket minskar – effekter som syns i mätningar redan inom 20 minuter efter sista cigaretten.' },
        { number: '02', title: 'Bättre Kondition', content: 'Hemoglobin frigjort från kolmonoxid kan igen fullt ut binda och transportera syre. VO₂ Max – konditionen – förbättras märkbart inom veckor av rökfrihet utan att träningen ens behöver intensifieras.' },
        { number: '03', title: 'Längre liv', content: 'Rökning är den starkaste enskilda riskfaktorn för stroke, hjärtinfarkt, KOL och flera cancerformer. Rökfrihet halverar risken för de flesta inom 5 år och normaliserar den inom 15.' },
      ],
    },
  },
  {
    id: uuidv4(),
    type: 'insight',
    breadcrumb: '08 Alkohol & Biologisk Återhämtning',
    title: 'DIN BIOLOGISKA',
    titleAccent: 'KLARHET.',
    heroImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1600&auto=format&fit=crop',
    intro: {
      lead: 'Alkohol är ett anestesimedel, inte ett sömnmedel. Det gör det lättare att somna men omöjligt att sova riktigt – och skillnaden märks i hjärnans prestanda nästa dag.',
      col1: 'Varför är alkohol ett fokusområde i hälsoprofilen? Alkohol påverkar inte bara levern – det fungerar som en kraftfull stressfaktor för hela nervsystemet. Även måttliga mängder kan störa den hormonella balansen och försämra kvaliteten på den djupsömn som hjärnan behöver för att återhämta sig.',
      col2: 'Att reglera konsumtionen ger hjärtat och kärlen välbehövlig avlastning. Lägre alkoholintag leder ofta till omedelbart förbättrad vilopuls, bättre blodfetter och ökad upplevd energi under arbetsdagen – effekter som syns i blodmarkörer inom bara några veckor.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Sömnfragmentering:',
      titleLine2: 'Återhämtningens fiende',
      content: 'Alkohol hämmar adenosin-återupptagningen och skapar initial sömnighet, men metaboliseras under natten till aldehyder som aktiverar stresshormonerna. REM-sömnen – kritisk för minne, kreativitet och emotionell bearbetning – suppresseras kraftigt under de timmar alkoholen metaboliseras. Studier med sömnövervakning visar att ens ett glas vin minskar REM-sömnen med 9–25 %. Alkoholfria perioder ger en av de snabbaste förbättringarna i objektiv sömnkvalitet som vi kan se i hälsodata.',
      quote: 'Att optimera alkoholvanorna är en av de snabbaste vägarna till att förbättra sin objektiva sömnkvalitet och mentala kapacitet.',
      image: 'https://images.unsplash.com/photo-1531171673193-06b9c89b2da8?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Metabol arkitektur',
      title: 'Leverhälsa:',
      titleLine2: 'Kroppens reningsverk',
      content: 'Levern är det organ som primärt metaboliserar alkohol, och under denna process prioriteras nedbrytningen av alkohol framför andra metabola uppgifter som fettförbränning och glukosreglering. Genom medveten konsumtion ger du levern möjlighet att arbeta optimalt med alla sina funktioner.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför optimera alkoholvanorna?',
      items: [
        { number: '01', title: 'Djupare Sömn', content: 'Alkoholfria nätter ger full tillgång till REM-sömn och djupsömn för maximal biologisk återhämtning.' },
        { number: '02', title: 'Metabol Effektivitet', content: 'Levern kan prioritera fettförbränning och glukosreglering utan störning från alkoholnedbrytning.' },
        { number: '03', title: 'Hjärt-kärlhälsa', content: 'Sänker blodtrycket och minskar belastningen på hjärtat under vilan för bättre långsiktig hälsa.' },
      ],
    },
  },

  // ── ADVICE / HÄLSOPLAN ARTICLES ───────────────────────────────────────────
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Rörelse & Fysisk Status',
    title: 'DIN VÄG',
    titleAccent: 'FRAMÅT.',
    heroImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Det viktigaste träningspasset är det som faktiskt blir av. Vi bygger inte din hälsa på motivation – vi bygger den på struktur.',
      body: 'Din hälsoplan inom rörelse är uppbyggd i tre faser. Varje fas bygger på föregående och anpassas till din nuvarande konditionsnivå. Oavsett startpunkt finns en tydlig väg mot förbättrad VO₂ Max, ökad muskelmassa och stärkt metabol hälsa.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Rörelsevanan',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Daglig rörelse utan krav',
        items: [
          { bold: 'Promenad 15–30 min dagligen.', text: 'Rask takt i dagsljus – detta sätter din biologiska klocka och aktiverar fettförbränning.' },
          { bold: 'Trappor framför hiss.', text: 'Enkla beslut som ackumulerar till hundratals extra minuter rörelse per vecka.' },
          { bold: 'Rörelsepaus på jobbet.', text: 'Res dig och rör på dig i 2 min var 45:e minut för att motverka inaktivitetens negativa metabola effekter.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Strukturerad träning',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Kondition och styrka',
        items: [
          { bold: 'Intervallträning 1 gång/vecka.', text: '8–10 intervaller á 30–60 sek med hög puls. Effektivaste metoden att höja VO₂ Max.' },
          { bold: 'Styrketräning 2 gånger/vecka.', text: 'Fokus på stora muskelgrupper: knäböj, marklyft, rodd. Ger muskelmassa och metabol aktivitet.' },
          { bold: 'Aktivitetsmål 8 000 steg/dag.', text: 'Mätbart mål som ger kontinuerlig feedback. Forskning visar tydlig hälsovinst redan vid denna nivå.' },
          { bold: 'Veckans längre pass.', text: 'Ett längre, lugnare konditionspass (45–60 min) för att bygga aerob bas och återhämtningsförmåga.' },
        ],
      },
      {
        number: '03',
        title: 'År 2+: Prestation & Optimering',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Individuell peak performance',
        items: [
          { bold: 'VO₂ Max-test.', text: 'Testa din konditionsnivå vartannat år för att se konkreta framsteg och kalibrera intensiteten rätt.' },
          { bold: 'Periodisering.', text: 'Variera träningsbelastning med hårdare och lättare veckor för att maximera anpassningen och minimera skaderisken.' },
          { bold: 'Kompletterande träning.', text: 'Yoga, simning eller pilates för rörlighet och skadeförebyggande – balanserar det strukturerade programmet.' },
        ],
      },
    ],
    cta: {
      tag: 'Redan aktiv?',
      title: 'The High Performance Path',
      body: 'Är du redan van vid träning och vill optimera dina resultat? För dig som vill gå från bra till elitnivå erbjuder vi personlig coachning och avancerade fysiologiska tester via våra experter på Aktivitus.',
      cards: [
        { title: 'Personlig Tränare', description: 'Skräddarsydda program baserade på din laktatprofil och VO₂ Max.' },
        { title: 'Löp- & Cykelcoach', description: 'Optimera din teknik och nå dina mål på tävling eller i din personliga träning.' },
      ],
      buttonText: 'Boka Coachning',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Sömn & Bio-restaurering',
    title: 'DIN NATTLIGA',
    titleAccent: 'REVOLUTION.',
    heroImage: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Sömnen är inte förlorad tid. Det är investeringen som ger avkastning i form av klarare hjärna, starkare immunförsvar och bättre träningsresultat – varje dag.',
      body: 'Sömnkvalitet är mer än antalet timmar. Denna plan fokuserar på att optimera sömnens arkitektur – fördelningen mellan djupsömn, REM och lättsömn – för att maximera den biologiska återhämtningen. Tre faser tar dig från sömnhygienens grunder till full sömnoptimering.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Sömnhygien',
        image: 'https://images.unsplash.com/photo-1511295742364-917544627d21?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Stabil grund för hjärnan',
        items: [
          { bold: 'Digital solnedgång.', text: 'Inga skärmar 60 minuter före sänggående. Blåljuset hämmar melatoninproduktionen med upp till 50 %.' },
          { bold: 'Fast läggdagstid.', text: 'Gå och lägg dig ±30 min samma tid varje kväll – även helger. Sätter den cirkadiska rytmen.' },
          { bold: 'Kvällsritual.', text: 'En konsekvent nedvarvningsritual (t.ex. läsning, stretch, te) signalerar till nervsystemet att det är dags.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Optimering',
        image: 'https://images.unsplash.com/photo-1520206159572-46ecd9927a76?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Sömnens djup och kvalitet',
        items: [
          { bold: 'Morgonljus direkt.', text: 'Exponera dig för dagsljus inom 30 min från uppvaknandet – detta förkortar insomningstiden och stärker djupsömnen.' },
          { bold: 'Sovrumtemperatur 16–18°C.', text: 'Kroppens kärntemperatur måste sjunka för att djupsömnsfaserna ska aktiveras. Svalt rum = bättre sömn.' },
          { bold: 'Koffein-stopp kl 14.', text: 'Koffein har en halveringstid på 5–7 timmar. Eftermiddagskaffe finns kvar i blodet vid läggdags.' },
          { bold: 'Alkoholfri buffert.', text: 'Undvik alkohol minst 3 timmar före sänggående för att inte störa REM-sömnen.' },
        ],
      },
      {
        number: '03',
        title: 'År 2+: Biohacking & Mätning',
        image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Data och individuell optimering',
        items: [
          { bold: 'Sömnspårare.', text: 'Använd en wearable (Oura, Garmin, Whoop) för att objektivt mäta djupsömn och REM – och se vad som faktiskt påverkar din sömn.' },
          { bold: 'Temperaturoptimering.', text: 'Experimentera med kyltäcke, fönster på glänt, eller kylmatta – hitta din optimala sovtemperatur.' },
          { bold: 'Kronotypsanpassning.', text: 'Identifiera om du är morgon- eller kvällstyp och anpassa schemaläggning av krävande arbete och träning därefter.' },
        ],
      },
    ],
    cta: {
      tag: 'Behöver du mer?',
      title: 'Expertstöd för Återhämtning',
      body: 'Om du upplever att sömnen trots goda vanor inte räcker till, eller om du vill optimera din återhämtning inför specifika mål, kan Aktivitus hjälpa dig med avancerad analys.',
      cards: [
        { title: 'Sömnrådgivning', description: 'Djupgående analys av dina rutiner och biologiska förutsättningar för sömn.' },
        { title: 'HRV-analys', description: 'Hjärtvariabilitetsmätning som avslöjar hur ditt nervsystem faktiskt återhämtar sig.' },
      ],
      buttonText: 'Boka Rådgivning',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Kost & Bio-energi',
    title: 'NÄRING FÖR',
    titleAccent: 'LIVET.',
    heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Mat är biokemisk information. Varje tugga talar om för dina gener om de ska reparera eller förfalla, inflammera eller läka.',
      body: 'Denna plan är uppbyggd för att successivt optimera din metabola hälsa – från att stabilisera blodsockret och energinivån till att aktivt skydda hjärta och kärl. Tre faser tar dig från grunderna till en hälsosam relation med mat som håller livet ut.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Stabil Energi',
        image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Blodsocker & Fokus',
        items: [
          { bold: 'Protein i varje mål.', text: 'Inkludera en proteinkälla (ägg, bönor, fisk, kött) vid varje måltid – stabiliserar blodsockret och ger långvarig mättnad.' },
          { bold: 'Fiber först.', text: 'Börja måltiden med grönsaker. Fibrerna bildar ett nätverk i tarmen som bromsar glukosupptaget och dämpar insulinsvaret.' },
          { bold: 'Vatten före kaffe.', text: 'Starta dagen med ett glas vatten för att aktivera ämnesomsättningen och stödja cellernas syresättning.' },
          { bold: 'Undvik drycker med socker.', text: 'Flytande kalorier ger ingen mättnadssignal och driver blodsockerspikar som skapar trötthet och sug.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Långsiktigt Skydd',
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Hjärthälsa & Inflammation',
        items: [
          { bold: 'Goda fetter dagligen.', text: 'Avokado, olivolja, nötter och fet fisk höjer HDL och sänker det skadliga LDL – utan att begränsa kalorier.' },
          { bold: 'Regnbågsmetoden.', text: 'Ät minst tre färger av grönsaker per dag. Polyphenoler och flavonoider är kraftfulla kärlskyddare.' },
          { bold: 'Minska processat socker.', text: 'Dolt socker i halvfabrikat driver triglycerider och belastar levern – börja med att läsa innehållsförteckningen.' },
          { bold: 'Periodisk proteinoptimering.', text: '1.6–2.0 g protein per kg kroppsvikt dagligen om du tränar. Fördelat jämnt över måltiderna maximerar muskeluppbyggnaden.' },
        ],
      },
      {
        number: '03',
        title: 'År 2+: Precision Nutrition',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Individuell anpassning',
        items: [
          { bold: 'Kontinuerlig glukosmätning (CGM).', text: 'Prova en CGM-sensor i 2 veckor för att se exakt hur ditt blodsocker svarar på olika livsmedel och måltidstider.' },
          { bold: 'Elimination av triggers.', text: 'Identifiera de livsmedel som ger störst blodsockerspik och ersätt dem med alternativ som ger samma njutning med bättre metabolt utfall.' },
          { bold: 'Tidsrestrikterat ätande.', text: 'Begränsa ätfönstret till 8–10 timmar per dag. Ger levern och bukspottkörteln återhämtningstid och kan förbättra insulinkänsligheten.' },
        ],
      },
    ],
    cta: {
      tag: 'Vill du ta nästa steg?',
      title: 'Professionell Kostrådgivning',
      body: 'Behöver du en personlig plan för att optimera dina resultat? Aktivitus experter hjälper dig att tolka dina värden och skapa ett schema som passar din unika vardag.',
      cards: [
        { title: 'Individuellt kostschema', description: 'Skräddarsytt baserat på din ämnesomsättning och dina hälsomål.' },
        { title: 'Metabol Analys', description: 'Få reda på exakt hur din kropp förbränner fett och kolhydrater vid olika intensiteter.' },
      ],
      buttonText: 'Boka Rådgivning',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Stresshantering & Resiliens',
    title: 'SKAPA DIN',
    titleAccent: 'MOTSTÅNDSKRAFT.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Stress är kroppen i mobiliseringsläge. Det är inte problemet – bristen på återgång till vila är problemet. Din plan är att bygga den återgången systematisk.',
      body: 'Återhämtning handlar om att ge nervsystemet chansen att växla ner. Genom att integrera små, regelbundna vanor i din vardag kan du sänka din grundspänning och förbättra din mentala skärpa, oavsett hur hög belastningen är på arbetet.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Mikro-pauser',
        image: 'https://images.unsplash.com/photo-1499209974431-9dac32a3a60d?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Bryt stress-spiralen tidigt.',
        items: [
          { bold: 'Andningsteknik:', text: 'Testa 4-7-8 metoden (andas in 4 sekunder, håll 7, andas ut 8) när du känner stressen stiga.' },
          { bold: 'Digital detox:', text: 'Stäng av alla icke-nödvändiga notiser på mobilen för att minska antalet mentala avbrott.' },
          { bold: 'Töm hjärnan:', text: 'Skriv en "att göra"-lista inför nästa dag innan du lämnar jobbet för att släppa tankarna på kvällen.' },
          { bold: 'Rörelsepaus som stressventil.', text: 'En 10-minuters promenad vid stresstopp sänker kortisol lika effektivt som ett lugnande medel – utan biverkningar.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Hållbar Livsstil',
        image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Bygg långsiktig resiliens.',
        items: [
          { bold: 'Natur som medicin:', text: 'Sikta på minst 20 minuters kravlös vistelse i grönområden två gånger i veckan.' },
          { bold: 'Sömn som skydd:', text: 'Se återhämtning som en del av din prestation. Prioritera 7-8 timmars sömn för att reglera stresshormoner.' },
          { bold: 'Lär dig säga nej:', text: 'Värna om din fritid genom att sätta tydliga gränser för när du är tillgänglig.' },
          { bold: 'Mätbar återhämtning.', text: 'Skaffa en HRV-tracker (ex. Oura eller Garmin) för att objektivt se när kroppen återhämtat sig och när den fortfarande är under stress.' },
        ],
      },
    ],
    cta: {
      tag: 'Behöver du mer stöd?',
      title: 'Expertstöd för Mental Hållbarhet',
      body: 'Upplever du att stressen påverkar din vardag i för hög grad? Aktivitus erbjuder specialiserade verktyg för att mäta och hantera belastning på ett djupare plan.',
      cards: [
        { title: 'Stresscoaching', description: 'Individuella samtal med fokus på strategier för gränssättning och återhämtning i arbetslivet.' },
        { title: 'HRV-analys', description: 'Mätning av hjärtvariabilitet under flera dygn för att svart på vitt se när din kropp faktiskt återhämtar sig.' },
      ],
      buttonText: 'Kontakta en Coach',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Social Hälsa & Relationer',
    title: 'DIN SOCIALA',
    titleAccent: 'KRAFT.',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Vi är biologiskt kodade för samhörighet. Kvaliteten på dina relationer är en av de starkaste markörerna för ett långt och friskt liv.',
      body: 'Social hälsa handlar om stödet från din omgivning och kvaliteten på dina interaktioner. Starka sociala band fungerar som en stötdämpare mot stress och skyddar din mentala hälsa genom att frigöra hormoner som motverkar kroppens stresspåslag.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Närvaro',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Kvalitet framför kvantitet',
        items: [
          { bold: 'Aktivt lyssnande:', text: 'Ge din fulla uppmärksamhet i samtal genom att lägga undan mobilen helt.' },
          { bold: 'Små gester:', text: 'En enkel kontakt eller ett uppskattande ord i vardagen stärker banden märkbart över tid.' },
          { bold: 'Gemensamma måltider:', text: 'Försök sitta ner och äta tillsammans utan distraktioner minst några gånger i veckan.' },
          { bold: 'Tacksam kontakt.', text: 'Skicka ett meddelande till någon du uppskattar varje vecka. Forskning visar att uttryckt tacksamhet stärker banden lika mycket som fysiska möten.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Gemenskap',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Utökat nätverk',
        items: [
          { bold: 'Hitta ett sammanhang:', text: 'Delta i en gruppaktivitet eller förening som matchar dina intressen, t.ex. träning.' },
          { bold: 'Planerad tid:', text: 'Boka in återkommande träffar med vänner eller familj för att säkerställa att relationerna underhålls.' },
          { bold: 'Öppenhet:', text: 'Våga dela med dig av både framgångar och utmaningar för att skapa djupare förtroende.' },
        ],
      },
    ],
    cta: {
      tag: 'Vill du utveckla dina sociala strategier?',
      title: 'Vägledning för Social Hälsa',
      body: 'Känner du att dina sociala sammanhang dränerar dig snarare än ger energi? Aktivitus erbjuder stöd för att navigera relationer och bygga hållbara nätverk.',
      cards: [
        { title: 'Hälsocoaching', description: 'Individuella samtal för att identifiera sociala stressfaktorer och bygga resiliens.' },
        { title: 'Gruppaktiviteter', description: 'Möjlighet att träna och utvecklas tillsammans med andra i ett professionellt lett sammanhang.' },
      ],
      buttonText: 'Boka Samtal',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Balans & Hållbarhet',
    title: 'DIN MENTALA',
    titleAccent: 'FRIHET.',
    heroImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Prestation kräver paus. Att värna om sin fritid är inte att göra mindre – det är att göra det möjligt att göra mer, under längre tid, med bättre resultat.',
      body: 'Balans mellan arbete och fritid är grunden för din långsiktiga hälsa. Genom att medvetet separera prestation från återhämtning skapar du utrymme för nervsystemet att varva ner, vilket direkt påverkar din sömnkvalitet och din stresstålighet.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Gränssättning',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Tydlig separation',
        items: [
          { bold: 'Avslutningsritual:', text: 'Skapa en vana som markerar arbetsdagens slut, som att stänga ner datorn helt eller ta en kort promenad.' },
          { bold: 'Digitala barriärer:', text: 'Inaktivera arbetsrelaterade notiser på din privata telefon under kvällar och helger.' },
          { bold: 'Prioritering:', text: 'Lär dig att skilja på vad som är brådskande och vad som faktiskt är viktigt för din hälsa.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Återhämtning',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Kvalitativ fritid',
        items: [
          { bold: 'Aktiv vila:', text: 'Byt ut passiv skärmtid mot aktiviteter som ger energi, som hobbys eller socialt umgänge.' },
          { bold: 'Planerad oplanerad tid:', text: 'Boka in tid i kalendern där ingenting är inplanerat för att låta hjärnan vila.' },
          { bold: 'Reflektion:', text: 'Använd den subjektiva skalan (1–10) varje månad för att checka in med din känsla av balans.' },
          { bold: 'Mätpunkt varje månad.', text: 'Skatta din upplevda balans på skalan 1–10 och följ trenden. Det skapar medvetenhet och tidig signal om att något behöver justeras.' },
        ],
      },
    ],
    cta: {
      tag: 'Vill du nå en ny nivå av hållbarhet?',
      title: 'Expertstöd för Livsbalans',
      body: 'Ibland krävs externa perspektiv för att bryta mönster. Våra experter på Aktivitus hjälper dig att kartlägga din belastning och hitta dina unika nycklar till återhämtning.',
      cards: [
        { title: 'Livsstilscoaching', description: 'Individuellt stöd för att optimera din vardag och stärka din mentala resiliens.' },
        { title: 'Hälsokontroll', description: 'Få en djupare förståelse för hur din livsstil påverkar din fysiska status.' },
      ],
      buttonText: 'Boka Konsultation',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Tobaksfrihet',
    title: 'REN',
    titleAccent: 'KAPACITET.',
    heroImage: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Att sluta röka är inte att ge upp något – det är att återta full kontroll över din biologi. Varje rökfri dag är en mätbar investering i ditt hjärta och dina lungor.',
      body: 'Tobaksfrihet är den enskilt kraftfullaste hälsoförändring du kan göra. Kroppen börjar läka inom minuter och fortsätter reparera kärlen, lungorna och hjärtmuskeln under år. Denna plan ger dig konkreta verktyg för varje fas av den resan.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Omprogrammering',
        image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Bryt vaneloopen',
        items: [
          { bold: 'Identifiera triggers.', text: 'Kartlägg de klockslag och situationer då suget uppstår. Ersätt dem med en ny vana: en kort promenad, djupandning eller ett glas vatten.' },
          { bold: 'Vätska vid sug.', text: 'Drick ett stort glas vatten när suget kommer. Hjälper kroppen rensa restprodukter och ger munnen något att göra.' },
          { bold: 'En dag i taget.', text: 'Fokusera på att vara rökfri idag, inte för alltid. Varje avklarad dag stärker tilltron till den egna förmågan.' },
          { bold: 'Belöningssystem.', text: 'Märk milstolpar (1 vecka, 1 månad, 3 månader) med en meningsfull belöning som förstärker identiteten som rökfri.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Cellulär Läkning',
        image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Märk kroppen återhämta sig',
        items: [
          { bold: 'Konditionstest.', text: 'Testa din uthållighet och märk hur syreupptagningsförmågan förbättras när hemoglobinet åter kan binda syre fullt.' },
          { bold: 'Långsiktigt kärlskydd.', text: 'Fokusera på vinsten: kärlelasticitet, sänkt blodtryck, minskad risk för hjärtinfarkt och stroke.' },
          { bold: 'Hantera sociala situationer.', text: 'Öva på att tacka nej i sammanhang där rökning normaliseras, utan att behöva förklara eller försvara valet.' },
        ],
      },
      {
        number: '03',
        title: 'År 2+: Rökfri som identitet',
        image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Konsolidera och fira',
        items: [
          { bold: 'Mät hälsovinster.', text: 'Ta ett konditionstest eller spirometri-test och jämför med ditt utgångsvärde. Siffror gör abstrakta vinster konkreta.' },
          { bold: 'Stöd andra.', text: 'Att guida en vän eller kollega i ett rökavvänjningsförsök befäster din egen identitet som rökfri och ger meningsfullhet.' },
          { bold: 'Riskmedvetenhet.', text: 'Fortsätt förstå varför du valt rökfrihet – läs om fortsatta läkningsprocesser som sker år 5 och år 10 efter avslut.' },
        ],
      },
    ],
    cta: {
      tag: 'Behöver du verktyg för förändringen?',
      title: 'Professionell Rökavvänjning',
      body: 'Att bryta ett nikotinberoende är biologiskt utmanande. Aktivitus erbjuder personlig coachning och evidensbaserade strategier för att göra resan lättare.',
      cards: [
        { title: 'Rökavvänjningscoach', description: 'Personlig plan och stöd i realtid under de kritiska första månaderna.' },
        { title: 'Hälsokontroll före & efter', description: 'Mät konkreta förbättringar i blodtryck, kondition och kärlhälsa.' },
      ],
      buttonText: 'Boka Hälsocoach',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
  {
    id: uuidv4(),
    type: 'advice',
    breadcrumb: 'Alkohol & Återhämtning',
    title: 'BIOLOGISK',
    titleAccent: 'KLARHET.',
    heroImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1600&auto=format&fit=crop',
    intro: {
      quote: 'Att optimera sin alkoholkonsumtion är inte abstinens – det är medvetet val. Och det är en av de snabbaste vägarna till bättre sömn, klarare hjärna och lägre blodtryck.',
      body: 'Alkohol påverkar sömnkvalitet, leverbelastning, blodtryck och kognitiv förmåga. Denna plan ger dig en progressiv strategi för att minska den biologiska belastningen och maximera kroppens återhämtning – utan att nödvändigtvis bli helnykterist.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Återställning',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Upplev kroppens naturliga återhämtning',
        items: [
          { bold: 'Alkoholfria perioder.', text: 'Inför minst 3–4 alkoholfria dagar i veckan. Levern och nervsystemet börjar normaliseras, och sömnkvaliteten förbättras märkbart.' },
          { bold: 'Alkoholfritt alternativ.', text: 'Välj ett premium-alkoholfritt alternativ (öl, vin, spirits) i sociala sammanhang. Ritualen finns kvar, belastningen försvinner.' },
          { bold: 'Jämför morgonpigghet.', text: 'Jämför hur du mår på morgonen efter alkoholfria respektive alkohollägre nätter. Den upplevda skillnaden är den starkaste motivatorn.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Optimering',
        image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Medvetna val och biologisk vinst',
        items: [
          { bold: '3-timmarsregeln.', text: 'Undvik alkohol minst 3 timmar före sänggående för att skydda REM-sömnens kvalitet och djupsömnens arkitektur.' },
          { bold: 'Kvalitet framför kvantitet.', text: 'Välj ett glas du verkligen njuter av framför flera av varaktighet. Detta minskar konsumtionen utan känsla av uppoffring.' },
          { bold: 'Veckovis kalkyl.', text: 'Håll koll på veckans totala konsumtion – inte enskilda tillfällen. Ger ett mer rättvist perspektiv och identifierar mönster.' },
          { bold: 'Mät effekten.', text: 'Notera vilopuls, energinivå och sömnkvalitet under alkoholfria perioder för att göra hälsovinsten konkret och synlig.' },
        ],
      },
      {
        number: '03',
        title: 'År 2+: Medveten relation',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Hållbar livsstil',
        items: [
          { bold: 'Biomarkörkontroll.', text: 'Ta ett återkommande hälsotest och se hur levertransaminaser, triglycerider och blodtryck svarar på din justerade konsumtion.' },
          { bold: 'Socialt kapital utan alkohol.', text: 'Identifiera och odla sociala sammanhang och ritualer som ger trygghet och glädje utan att alkohol är central.' },
          { bold: 'Personlig gräns.', text: 'Definiera din egna övre gräns baserad på hälsomål, inte social norm. Forskning stödjer att "lagom" är individuellt – hjärna och lever är bäst guiderna.' },
        ],
      },
    ],
    cta: {
      tag: 'Vill du optimera din återhämtning?',
      title: 'Biologisk Analys av Din Livsstil',
      body: 'Aktivitus kan mäta hur din kropp faktiskt svarar på din alkoholkonsumtion – med HRV-analys och blodmarköruppföljning.',
      cards: [
        { title: 'HRV-analys', description: 'Se i realtid hur ditt nervsystem och sömnkvalitet svarar på livsstilsförändringar.' },
        { title: 'Metabol blodmarkörpanel', description: 'Mät levermarkörer, triglycerider och blodtryck för att se konkreta biologiska vinster.' },
      ],
      buttonText: 'Boka HRV-analys',
      buttonUrl: 'https://aktivitus.se/bokning',
    },
  },
]

// ── Firebase CRUD ─────────────────────────────────────────────────────────────

async function seedToFirebase() {
  for (const article of SEED_ARTICLES) {
    await set(ref(db, `articles/${article.type}/${article.id}`), article)
  }
}

export async function fetchArticles() {
  const snap = await get(ref(db, 'articles'))
  if (!snap.exists()) {
    await seedToFirebase()
    return SEED_ARTICLES
  }
  const val = snap.val()
  const all = []
  for (const typeGroup of Object.values(val)) {
    all.push(...Object.values(typeGroup))
  }
  return all
}

export async function fetchArticle(id) {
  const articles = await fetchArticles()
  return articles.find(a => a.id === id) ?? null
}

export async function saveArticle(article) {
  await set(ref(db, `articles/${article.type}/${article.id}`), article)
  return article
}

export async function deleteArticle(article) {
  await remove(ref(db, `articles/${article.type}/${article.id}`))
}

// Återställer en artikel till seed-standard men bevarar alla bilder från befintlig artikel
export async function resetArticleToDefault(article) {
  const normalize = s => s.replace(/^\d+\s+/, '').trim()
  const words = t => t.toLowerCase().replace(/[^a-zåäö0-9]/gi, ' ').split(/\s+/).filter(w => w.length > 2)
  // Matcha på breadcrumb först, annars på title + titleAccent, annars på nyckelordsöverlapp
  const seed = SEED_ARTICLES.find(
    s => s.type === article.type && normalize(s.breadcrumb) === normalize(article.breadcrumb)
  ) ?? SEED_ARTICLES.find(
    s => s.type === article.type && s.title === article.title && s.titleAccent === article.titleAccent
  ) ?? SEED_ARTICLES.find(s => {
    if (s.type !== article.type) return false
    const aWords = words(article.breadcrumb)
    const sWords = words(s.breadcrumb)
    return aWords.filter(w => sWords.includes(w)).length >= 2
  })
  if (!seed) throw new Error(`Ingen seed-artikel hittad för "${article.breadcrumb}"`)


  const reset = JSON.parse(JSON.stringify(seed))
  reset.id = article.id

  // Bevara befintliga bilder och redaktionella tillägg
  if (article.references) reset.references = article.references
  if (article.heroImage) reset.heroImage = article.heroImage
  if (article.type === 'insight') {
    if (article.sectionA?.image) reset.sectionA.image = article.sectionA.image
    if (article.sectionB?.image) reset.sectionB.image = article.sectionB.image
  }
  if (article.type === 'advice' && article.phases) {
    article.phases.forEach((phase, i) => {
      if (phase?.image && reset.phases[i]) reset.phases[i].image = phase.image
    })
  }

  await set(ref(db, `articles/${article.type}/${article.id}`), reset)
  return reset
}

export async function createArticle(type = 'insight') {
  const article = type === 'advice'
    ? {
        id: uuidv4(),
        type: 'advice',
        breadcrumb: 'Nytt fokusområde',
        title: 'DIN VÄG',
        titleAccent: 'FRAMÅT.',
        heroImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1600&auto=format&fit=crop',
        intro: {
          quote: 'Skriv ditt inledande citat här.',
          body: 'Skriv en inledande beskrivning av hälsoplanen här.',
        },
        phases: [
          {
            number: '01',
            title: 'Månad 1–3: Fas 1',
            image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop',
            focusLabel: '',
            items: [{ bold: 'Punkt 1:', text: 'Beskrivning av åtgärd.' }],
          },
          {
            number: '02',
            title: 'Månad 4–12: Fas 2',
            image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
            focusLabel: '',
            items: [{ bold: 'Punkt 1:', text: 'Beskrivning av åtgärd.' }],
          },
        ],
        cta: {
          tag: '',
          title: 'Vill du veta mer?',
          body: 'Kontakta Aktivitus för personlig rådgivning.',
          cards: [
            { title: 'Tjänst 1', description: 'Beskrivning av tjänsten.' },
            { title: 'Tjänst 2', description: 'Beskrivning av tjänsten.' },
          ],
          buttonText: 'Boka Konsultation',
          buttonUrl: 'https://aktivitus.se/bokning',
        },
      }
    : {
        id: uuidv4(),
        type: 'insight',
        breadcrumb: 'Ny artikel',
        title: 'DIN NYA',
        titleAccent: 'RUBRIK.',
        heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop',
        intro: {
          lead: 'Skriv din inledande text här.',
          col1: 'Första stycket...',
          col2: 'Andra stycket...',
        },
        sectionA: {
          label: 'Mätvärdet i fokus',
          title: 'Rubrik:',
          titleLine2: 'Underrubrik',
          content: 'Innehåll för sektion A...',
          quote: 'Ett inspirerande citat här.',
          image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
        },
        sectionB: {
          label: 'Arkitektur',
          title: 'Rubrik:',
          titleLine2: 'Underrubrik',
          content: 'Innehåll för sektion B...',
          image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=800&auto=format&fit=crop',
        },
        why: {
          title: 'Varför satsa?',
          items: [
            { number: '01', title: 'Fördel ett', content: 'Beskrivning av fördel ett.' },
            { number: '02', title: 'Fördel två', content: 'Beskrivning av fördel två.' },
            { number: '03', title: 'Fördel tre', content: 'Beskrivning av fördel tre.' },
          ],
        },
      }
  await saveArticle(article)
  return article
}
