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
      lead: 'Träning är inte bara kaloriförbränning. Det är en biologisk signal som optimerar allt från din kognitiva förmåga till din cellförnyelse.',
      col1: 'Varför är träning det första vi tittar på? Svaret ligger i dess förmåga att reglera kroppens övriga system. En ökad träningsmängd har en direkt positiv effekt på din sömnkvalitet och din förmåga att hantera stress. Det fungerar som en katalysator för hela din livsstilsprofil.',
      col2: 'Genom att belasta kroppen kontrollerat tvingar vi hjärtat och musklerna att anpassa sig. Denna anpassning mäts bäst genom kondition (VO2 Max) och muskelmassa, två värden som tillsammans ger oss en tydlig bild av din biologiska hälsa och framtida kapacitet.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Kondition:',
      titleLine2: 'Motorn för långlevnad',
      content: 'Kondition (mäts ofta som VO2 Max) är den enskilt starkaste indikatorn på din framtida hälsa. Det mäter hur effektivt din kropp kan ta upp och använda syre.',
      quote: 'Att förbättra sin kondition från nivån "Låg" är det största klivet man kan ta för att minska risken för hjärt-kärlsjukdom.',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Fysisk arkitektur',
      title: 'Muskelmassa:',
      titleLine2: 'Din hälsoreserver',
      content: 'Muskelmassa handlar inte bara om styrka. Muskler är metabolt aktiv vävnad som hjälper till att reglera ditt blodsocker och din förbränning. Att bibehålla en sund procentuell muskelmassa (t.ex. 44%) är avgörande för att hålla kroppen "ung" och motståndskraftig.',
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på träning?',
      items: [
        { number: '01', title: 'Mental Skärpa', content: 'Ökar blodflödet till hjärnan och förbättrar kognitiv funktion och kreativitet.' },
        { number: '02', title: 'Hormonell Reglering', content: 'Sänker stresshormoner och ökar frisättningen av dopamin och endorfiner.' },
        { number: '03', title: 'Metabol Kraft', content: 'Optimerar hur din kropp hanterar glukos och fett för stabil energi hela dagen.' },
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
      lead: 'Sömn är inte passiv tid. Det är ett aktivt tillstånd där din hjärna tvättas och din kropp byggs upp på nytt.',
      col1: 'Varför är sömnen fundamentet i din hälsoprofil? Under de timmar du sover genomgår kroppen processer som är omöjliga att replikera i vaket tillstånd. Det är här din mentala energi skapas, dina minnen konsolideras och dina stressnivåer nollställs.',
      col2: 'Utan tillräcklig sömnkvalitet minskar kroppens förmåga att reglera viktiga värden som glukos och blodfetter. Sömnen fungerar som den avgörande faktorn för hur väl din kropp kan tillgodogöra sig effekterna av din träning och kost.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Djupsömn:',
      titleLine2: 'Hjärnans tvättmaskin',
      content: 'Under djupsömnen aktiveras det glymphatiska systemet. Hjärncellerna krymper något, vilket tillåter ryggmärgsvätska att skölja igenom vävnaden och rensa bort metabola slaggprodukter som byggts upp under dagen.',
      quote: 'God sömn är den enskilt viktigaste faktorn för att bibehålla kognitiv skärpa och hantera de krav som ställs i vardagen.',
      image: 'https://images.unsplash.com/photo-1511295742364-917544627d21?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Biokemisk arkitektur',
      title: 'Hormonell harmoni:',
      titleLine2: 'Stress & Hunger',
      content: 'Sömnen styr balansen mellan stresshormonet kortisol och de hormoner som reglerar hunger och mättnad. En bristfällig sömn leder till ökad stresskänslighet och försämrad metabol kontroll, vilket direkt påverkar dina långsiktiga hälsovärden.',
      image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på sömn?',
      items: [
        { number: '01', title: 'Fysisk Läkning', content: 'Maximerar frisättningen av tillväxthormon som reparerar vävnad och stärker immunförsvaret.' },
        { number: '02', title: 'Emotionell Resiliens', content: 'Nollställer hjärnans känslocenter och gör dig mer motståndskraftig mot stress.' },
        { number: '03', title: 'Metabol Kraft', content: 'Säkerställer optimal insulinkänslighet och stabiliserar dina blodsockernivåer.' },
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
      lead: 'Maten är mer än bara kalorier. Det är biokemisk information som styr din energinivå, dina inflammationer och din långsiktiga hälsa.',
      col1: 'Varför är kosten en hörnsten i din profil? Rätt näring handlar om att ge kroppen de byggstenar som krävs för att reparera vävnad efter träning och bibehålla en stabil kognitiv funktion under arbetsdagen.',
      col2: 'Genom att analysera dina blodvärden får vi ett kvitto på hur din kost påverkar din insida. Dina resultat visar på en optimal balans, vilket är en direkt indikation på att din nuvarande kosthållning stödjer dina metabola processer på ett effektivt sätt.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Glukos:',
      titleLine2: 'Din energireglering',
      content: 'Ditt glukosvärde på 5.2 mmol/L ligger inom den optimala zonen. Detta mäter ditt blodsocker och visar hur effektivt din kropp hanterar kolhydrater och insulin. En stabil glukosnivå är nyckeln till att undvika energidips och skydda dina kärl över tid.',
      quote: 'Ett stabilt blodsocker är grunden för både jämn prestationsförmåga och en balanserad hormonell miljö.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Blodfetter',
      title: 'Lipidprofilen:',
      titleLine2: 'Hjärtats skydd',
      content: 'Dina värden för LDL (2.9 mmol/L) och HDL (1.5 mmol/L) ger en optimal LDL/HDL-kvot på 1.9. Detta tyder på att din kost innehåller en god balans av fetter som skyddar dina kärl mot plackbildning och främjar en god hjärthälsa.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på kosten?',
      items: [
        { number: '01', title: 'Stabil Energi', content: 'Genom att kontrollera glukosnivåerna eliminerar du trötthet efter måltider och håller hjärnan skarp.' },
        { number: '02', title: 'Långsiktigt Skydd', content: 'Optimala lipidvärden sänker risken för framtida hjärt-kärlbesvär avsevärt.' },
        { number: '03', title: 'Effektiv Återhämtning', content: 'Rätt näring ger musklerna de resurser de behöver för att växa och repareras efter träning.' },
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
      lead: 'Stress är en naturlig resurs för prestation, men utan adekvat återhämtning blir tillståndet tärande på din biologi.',
      col1: 'Varför är stresshantering ett prioriterat område? Din subjektiva skattning på 6/10 är det lägsta värdet i din livsstilsprofil. Det innebär att detta är din enskilt största hävstång för att förbättra din totala hälsa. Stress påverkar inte bara ditt mående, utan har en direkt koppling till ditt hjärt-kärlsystem och din sömnkvalitet.',
      col2: 'Genom att balansera kraven i vardagen med medveten återhämtning kan du sänka kroppens grundspänning. Din balans mellan arbete och fritid skattas till 7/10, vilket ger en stabil grund, men optimering här kan ge stora vinster för din långsiktiga hållbarhet och mentala skärpa.',
    },
    sectionA: {
      label: 'Mätvärdet i fokus',
      title: 'Blodtryck:',
      titleLine2: 'Hjärtats kvitto',
      content: 'Ditt blodtryck på 120/76 mmHg bedöms som "BRA". Blodtrycket är en direkt indikator på hur stress påverkar dina kärl. Genom att hålla stressen på en balanserad nivå säkerställer du att hjärtat inte behöver arbeta under konstant övertryck.',
      quote: 'Att aktivt växla ner nervsystemet är den bästa medicinen för att bibehålla ett stabilt och hälsosamt blodtryck.',
      image: 'https://images.unsplash.com/photo-1499209974431-9dac32a3a60d?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Mental arkitektur',
      title: 'Återhämtning:',
      titleLine2: 'Nervsystemets paus',
      content: 'Återhämtning handlar om att aktivera det parasympatiska nervsystemet – kroppens "lugn-och-ro-system". Det handlar inte bara om vila, utan om aktiviteter som ger energi. Din träning är ett utmärkt verktyg för att ventilera stress och förbättra din motståndskraft.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på återhämtning?',
      items: [
        { number: '01', title: 'Sänkt inflammation', content: 'Kronisk stress driver inflammation i kroppen; återhämtning nollställer de inflammatoriska signalerna.' },
        { number: '02', title: 'Bättre Beslutsfattande', content: 'En balanserad hjärna har bättre tillgång till prefrontala cortex, sätet för logik och impulskontroll.' },
        { number: '03', title: 'Hjärtat i vila', content: 'Ger hjärtat och kärlen välbehövlig avlastning, vilket syns direkt på din vilopuls och ditt blodtryck.' },
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
      lead: 'Människan är en social varelse. Starka relationer är inte bara trevligt – det är en biologisk nödvändighet för ett långt och friskt liv.',
      col1: 'Varför mäter vi relationer i en hälsokontroll? Svaret ligger i hur social isolering eller dåliga relationer påverkar kroppens stressystem. Din skattning på 8/10 visar på ett starkt socialt sammanhang. Detta fungerar som en kraftfull buffert mot de krav du upplever i din vardag och ditt arbetsliv.',
      col2: 'Kvalitativa relationer sänker nivåerna av kronisk inflammation och förbättrar din mentala resiliens. Genom att vårda dina sociala band investerar du direkt i din hjärthälsa och din förmåga att återhämta sig från både fysisk och psykisk belastning.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Social Buffert:',
      titleLine2: 'Motvikt till stress',
      content: 'När vi upplever stöd från människor i vår närhet dämpas kroppens produktion av stresshormoner. Eftersom din stressnivå skattas till 6/10, är dina starka relationer på 8/10 en avgörande tillgång för att förhindra att stressen påverkar dina fysiska värden negativt.',
      quote: 'Social samhörighet är en av de starkaste prediktorerna för biologisk livslängd, viktigare än både rökfrihet och fysisk aktivitet.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Hälsoarkitektur',
      title: 'Meningsfullhet:',
      titleLine2: 'Livets sammanhang',
      content: 'Känslan av sammanhang (KASAM) är djupt förknippad med våra relationer. Att ha människor att dela framgångar och utmaningar med skapar en stabilitet som gör att du sover bättre och får mer energi till din träning. Det är en positiv spiral för din helhetshälsa.',
      image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför vårda relationer?',
      items: [
        { number: '01', title: 'Mental Hälsa', content: 'Fungerar som ett naturligt skydd mot depression och ångest genom ökad produktion av oxytocin.' },
        { number: '02', title: 'Immunförsvar', content: 'Forskning visar att personer med starka sociala band har ett mer responsivt immunförsvar.' },
        { number: '03', title: 'Långsiktig Hållbarhet', content: 'Minskar risken för livsstilssjukdomar genom att dämpa kroppens inflammatoriska stressvar.' },
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
      lead: 'Hållbar hälsa kräver tydliga gränser. Din förmåga att skilja på prestation och återhämtning är avgörande för dina mentala depåer.',
      col1: 'Varför mäter vi balansen mellan arbete och fritid? En hållbar livsstil bygger på att yrkeslivets krav inte dränerar din energi för personlig rekreation. Din skattning på 7/10 tyder på en stabil grund där du lyckas prioritera din egen tid, vilket är en förutsättning för att bibehålla fokus över tid.',
      col2: 'Utan en fungerande balans ökar risken för mental utmattning, vilket i sin tur påverkar både din sömn och din motivation för fysisk aktivitet. Genom att medvetet värna om din fritid skapar du det utrymme som krävs för att din kropp och hjärna ska kunna bearbeta dagens intryck och ladda om.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Gränssättning:',
      titleLine2: 'Skydda din återhämtning',
      content: 'Att kunna koppla bort arbetet helt under din fritid är nödvändigt för att sänka din grundspänning. Din skattning på 7/10 visar att du har verktygen för att skapa denna distans, vilket direkt gynnar dina stressnivåer och din totala livskvalitet.',
      quote: 'Förmågan att sätta gränser är inte bara en arbetslivsfråga, det är en av de viktigaste strategierna för långsiktig biologisk hållbarhet.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Hälsoarkitektur',
      title: 'Aktiv Fritid:',
      titleLine2: 'Meningsfull rekreation',
      content: 'Fritid handlar inte bara om passiv vila. Det handlar om aktiviteter som ger dig energi och meningsfullhet. Att ha tid för egna intressen och relationer stärker din mentala resiliens och gör dig bättre rustad för de utmaningar du möter i din vardag.',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför satsa på balans?',
      items: [
        { number: '01', title: 'Förebygger Utmattning', content: 'Tydliga pauser mellan arbete och vila är det mest effektiva skyddet mot mental dränering.' },
        { number: '02', title: 'Ökad Kreativitet', content: 'Hjärnan behöver oplanerad tid för att bearbeta information och generera nya idéer.' },
        { number: '03', title: 'Bättre Sömnkvalitet', content: 'När du släpper arbetsdagens tankar i tid hinner nervsystemet varva ner inför natten.' },
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
      lead: 'Rökfrihet är inte bara frånvaro av en vana. Det är en förutsättning för syresättning och en direkt investering i dina kärls elasticitet.',
      col1: 'Varför är rökfrihet en hörnsten i din profil? Din skattning på 10/10 innebär att du är rökfri, vilket är det enskilt viktigaste valet för din långsiktiga hälsa. Rökning påverkar kroppens förmåga att transportera syre, vilket har en direkt inverkan på din kondition och din kropps förmåga att återhämta sig.',
      col2: 'Genom att vara rökfri eliminerar du en av de största riskfaktorerna för hjärt-kärlsjukdomar. Detta återspeglas i dina positiva testresultat, där både ditt blodtryck och din blodanalys ligger inom de optimala zonerna. Din rökfria livsstil är fundamentet som gör att dina övriga hälsovärden kan glänsa.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Kärlhälsa:',
      titleLine2: 'Elasticitet och flöde',
      content: 'Rökning orsakar omedelbar kärlsammandragning och skadar kärlväggarna över tid. Tack vare din rökfrihet uppvisar du ett bra blodtryck på 120/76 mmHg. Detta innebär att ditt hjärta kan arbeta effektivt utan onödigt motstånd, vilket bevarar din cirkulatoriska hälsa långt in i framtiden.',
      quote: 'Att förbli rökfri är den mest kraftfulla åtgärden för att skydda artärerna och säkerställa en optimal syresättning av kroppens alla organ.',
      image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=800&auto=format&fit=crop',
    },
    sectionB: {
      label: 'Syreupptagningsförmåga',
      title: 'Kondition:',
      titleLine2: 'Maximal potential',
      content: 'Din kondition på 36 ml/min/kg kräver fungerande lungor och optimal syretransport i blodet. Som rökfri är ditt hemoglobin (160 g/L) fullt tillgängligt för att transportera syre till dina arbetande muskler, utan blockering från kolmonoxid.',
      image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=800&auto=format&fit=crop',
    },
    why: {
      title: 'Varför förbli rökfri?',
      items: [
        { number: '01', title: 'Hjärtat i balans', content: 'Sänker din vilopuls och ditt blodtryck, vilket minskar belastningen på hjärtmuskeln dygnet runt.' },
        { number: '02', title: 'Bättre Kondition', content: 'Säkerställer att dina lungor kan leverera maximal mängd syre till blodet under träning.' },
        { number: '03', title: 'Längre liv', content: 'Minskar drastiskt risken för allvarliga livsstilssjukdomar och främjar ett vitalt åldrande.' },
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
      lead: 'Alkohol är ett toxin som utmanar kroppens återhämtningsförmåga. Att förstå dess inverkan är nyckeln till att optimera din nattsömn och din metabola hälsa.',
      col1: 'Varför är alkohol ett fokusområde i din hälsoprofil? Din skattning på 8/10 tyder på ett medvetet förhållningssätt. Alkohol påverkar inte bara levern, utan fungerar som en kraftfull stressfaktor för nervsystemet. Även måttliga mängder kan störa din hormonella balans och försämra kvaliteten på den djupsömn som din hjärna behöver.',
      col2: 'Genom att reglera din konsumtion ger du hjärtat och kärlen välbehövlig avlastning. Detta återspeglas i dina fina värden för både blodtryck och blodfetter. En minskning av alkoholintag leder ofta till en omedelbar förbättring av din vilopuls och din upplevda energi under arbetsdagen.',
    },
    sectionA: {
      label: 'Mekanismen i fokus',
      title: 'Sömnfragmentering:',
      titleLine2: 'Återhämtningens fiende',
      content: 'Alkohol kan göra det lättare att somna, men det förstör sömnens arkitektur. Det hämmar REM-sömnen och ökar antalet mikrouppvaknanden, vilket gör att du vaknar utan att vara biologiskt utvilad. Genom att prioritera alkoholfria perioder maximerar du din djupsömn och din kognitiva skärpa.',
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
      quote: 'Det viktigaste passet är det som faktiskt blir av. Vi bygger din hälsa genom hållbara vanor, inte tillfälliga kraftansträngningar.',
      body: 'Baserat på din hälsoprofil fokuserar vi här på att förbättra din syreupptagningsförmåga och stärka din metabola hälsa. Oavsett om du börjar från noll eller vill optimera din prestation, finns det en tydlig väg för dig.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Fundamentet',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Daglig 15 minuters promenad i dagsljus.', text: '' },
          { bold: 'Använd trappor istället för hiss när möjligheten ges.', text: '' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Progression',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: '1 pass i veckan där pulsen går upp (rask promenad/cykling).', text: '' },
          { bold: '1 pass fokuserat på funktionell styrka för muskelmassa.', text: '' },
        ],
      },
    ],
    cta: {
      tag: 'Redan aktiv?',
      title: 'The High Performance Path',
      body: 'Är du redan van vid träning och vill optimera dina resultat? För dig som vill gå från bra till elitnivå erbjuder vi personlig coachning och avancerade fysiologiska tester via våra experter på Aktivitus.',
      cards: [
        { title: 'Personlig Tränare', description: 'Skräddarsydda program baserade på din specifika laktatprofil och VO2 Max.' },
        { title: 'Löp- & Cykelcoach', description: 'Optimera din teknik och nå dina mål på tävling eller i din personliga utveckling.' },
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
      quote: 'Sömnen är inte förlorad tid, det är då din kropp bygger morgondagens framgång.',
      body: 'Genom att fokusera på att förbättra din sömnkvalitet och dina kvällsrutiner kan vi sänka din upplevda stressnivå. En optimerad sömn är den snabbaste vägen till bättre fokus och fysisk prestation.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Sömnhygien',
        image: 'https://images.unsplash.com/photo-1511295742364-917544627d21?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Digital solnedgång:', text: 'Inga skärmar 60 minuter före sänggående.' },
          { bold: 'Regelbundenhet:', text: 'Gå och lägg dig samma tid varje kväll, även på helger.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Optimering',
        image: 'https://images.unsplash.com/photo-1520206159572-46ecd9927a76?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Ljusexponering:', text: 'Sök dagsljus direkt på morgonen för att ställa den inre klockan.' },
          { bold: 'Temperaturkontroll:', text: 'Håll sovrummet svalt (ca 18°C) för att främja djupsömn.' },
        ],
      },
    ],
    cta: {
      tag: 'Behöver du mer?',
      title: 'Expertstöd för Återhämtning',
      body: 'Om du upplever att sömnen trots goda vanor inte räcker till, eller om du vill optimera din återhämtning inför specifika mål, kan Aktivitus hjälpa dig med avancerad analys.',
      cards: [
        { title: 'Sömnrådgivning', description: 'En djupgående analys av dina rutiner och biologiska förutsättningar för sömn.' },
        { title: 'HRV-analys', description: 'Mätning av hjärtvariabilitet för att se hur ditt nervsystem faktiskt återhämtar sig.' },
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
      quote: 'Mat är mer än energi – det är byggstenar för dina celler och bränsle för din hjärna.',
      body: 'En balanserad näring är fundamentet för optimal hälsa. Genom att fokusera på råvaror som stödjer stabila blodsockernivåer och goda blodfetter skapar du en inre miljö där kroppen kan prestera och återhämta sig effektivt.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Stabil Energi',
        image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Blodsocker & Fokus',
        items: [
          { bold: 'Protein i varje mål:', text: 'Inkludera en proteinkälla (ägg, bönor, fisk, kött) vid varje måltid för att hålla mättnaden och dämpa blodsockerspiken.' },
          { bold: 'Fiber först:', text: 'Börja gärna måltiden med grönsaker. Fibrerna skapar ett "nät" i tarmen som gör att energin tas upp långsammare.' },
          { bold: 'Vatten före kaffe:', text: 'Börja dagen med ett glas vatten för att stötta ämnesomsättningen och cellernas syresättning.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Långsiktigt Skydd',
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop',
        focusLabel: 'Fokus: Hjärthälsa & Inflammation',
        items: [
          { bold: 'Goda fetter:', text: 'Öka intaget av omättade fetter från t.ex. avokado, olivolja och nötter för att gynna balansen mellan LDL och HDL.' },
          { bold: 'Regnbågsmetoden:', text: 'Ät minst tre olika färger av grönsaker per dag. Färgämnena är antioxidanter som skyddar dina kärl.' },
          { bold: 'Minska processat socker:', text: 'Dra ner på dolt socker i halvfabrikat för att sänka triglyceriderna och avlasta levern.' },
        ],
      },
    ],
    cta: {
      tag: 'Vill du ta nästa steg?',
      title: 'Professionell Kostrådgivning',
      body: 'Behöver du en personlig plan för att optimera dina resultaten? Aktivitus experter hjälper dig att tolka dina värden och skapa ett schema som passar din unika vardag.',
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
      quote: 'Stress är kroppens sätt att mobilisera kraft. Utmaningen ligger inte i stressen själv, utan i bristen på återhämtning.',
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
      quote: 'Prestation kräver paus. Att sätta gränser för arbetet är inte att göra mindre – det är att göra det möjligt att göra mer framöver.',
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
      quote: 'Varje andetag utan tobak är en direkt investering i din syreupptagningsförmåga och dina kärls framtida hälsa.',
      body: 'Tobaksfrihet är den enskilt kraftfullaste faktorn för att bibehålla en stark kondition och ett hälsosamt blodtryck. Genom att eliminera nikotin och rök ger du ditt hjärta avlastning och dina lungor möjligheten att fungera med full kapacitet under träning och vardag.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Omprogrammering',
        image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Bryt mönstret:', text: 'Identifiera de klockslag eller situationer då du vanligtvis använder tobak och ersätt dem med en ny, positiv vana (t.ex. en kort promenad).' },
          { bold: 'Vätska:', text: 'Drick mycket vatten vid sug. Det hjälper kroppen att rensa ut restprodukter och ger munnen något att göra.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Cellulär Läkning',
        image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Uthållighetstest:', text: 'Lägg märke till hur din kondition förbättras när syretransporten i blodet blir mer effektiv utan kolmonoxid.' },
          { bold: 'Långsiktigt skydd:', text: 'Fokusera på vinsten i kärlelasticitet som skyddar dig mot framtida hjärtbesvär.' },
        ],
      },
    ],
    cta: {
      tag: '',
      title: 'Behöver du verktyg för förändring?',
      body: 'Att bryta ett beroende kräver ibland professionell guidning. Aktivitus coacher hjälper dig att sätta upp en plan som håller.',
      cards: [],
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
      quote: 'Att minska toxisk belastning är den snabbaste vägen till att optimera din sömnkvalitet och din metabola hälsa.',
      body: 'Alkohol påverkar kroppen på flera plan – från att fragmentera din nattsömn till att öka det inre stresspåslaget i nervsystemet. Genom att ha ett medvetet förhållningssätt till konsumtion skapar du utrymme för kroppen att återhämta sig på djupet, vilket syns direkt på din energinivå och dina långsiktiga hälsovärden.',
    },
    phases: [
      {
        number: '01',
        title: 'Månad 1–3: Återställning',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Hjärna i vila:', text: 'Inför helt alkoholfria veckor för att låta levern och nervsystemet nollställas.' },
          { bold: 'Social strategi:', text: 'Välj alkoholfria alternativ vid sociala sammanhang för att märka skillnaden i morgonpigghet och fokus.' },
        ],
      },
      {
        number: '02',
        title: 'Månad 4–12: Optimering',
        image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?q=80&w=600&auto=format&fit=crop',
        focusLabel: '',
        items: [
          { bold: 'Sömnhack:', text: 'Undvik alkohol minst 3 timmar före sänggående för att inte störa djupsömnens dygnsrytm.' },
          { bold: 'Medvetna val:', text: 'Se alkohol som en krydda snarare än en vana. Kvalitet över kvantitet skyddar dina metabola markörer.' },
        ],
      },
    ],
    cta: {
      tag: '',
      title: 'Optimera din återhämtning',
      body: 'Vill du se exakt hur din kropp svarar på din livsstil? Vi använder HRV-analyser för att kartlägga din stress och återhämtning i realtid.',
      cards: [],
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
