import HeroSection from './article/HeroSection'
import IntroSection from './article/IntroSection'
import ContentSectionA from './article/ContentSectionA'
import ContentSectionB from './article/ContentSectionB'
import WhySection from './article/WhySection'
import ArticleFooter from './article/ArticleFooter'

export default function ArticlePreview({ article, editable = true }) {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 antialiased">
      <HeroSection
        breadcrumb={article.breadcrumb}
        title={article.title}
        titleAccent={article.titleAccent}
        heroImage={article.heroImage}
        editable={editable}
      />

      <main className="print-main max-w-4xl mx-auto px-6 py-24">
        <IntroSection
          lead={article.intro.lead}
          col1={article.intro.col1}
          col2={article.intro.col2}
        />

        <ContentSectionA
          label={article.sectionA.label}
          title={article.sectionA.title}
          titleLine2={article.sectionA.titleLine2}
          content={article.sectionA.content}
          quote={article.sectionA.quote}
          image={article.sectionA.image}
          editable={editable}
        />

        <ContentSectionB
          label={article.sectionB.label}
          title={article.sectionB.title}
          titleLine2={article.sectionB.titleLine2}
          content={article.sectionB.content}
          image={article.sectionB.image}
          editable={editable}
        />

        <WhySection
          title={article.why.title}
          items={article.why.items}
        />
      </main>

      <ArticleFooter references={article.references} editable={editable} />
    </div>
  )
}
