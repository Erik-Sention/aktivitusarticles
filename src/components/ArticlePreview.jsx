import HeroSection from './article/HeroSection'
import IntroSection from './article/IntroSection'
import ContentSectionA from './article/ContentSectionA'
import ContentSectionB from './article/ContentSectionB'
import WhySection from './article/WhySection'
import ArticleFooter from './article/ArticleFooter'

export default function ArticlePreview({ article, editable = true }) {
  // Support both new sections array and old sectionA/sectionB format
  const sections = article.sections ?? [
    article.sectionA && { type: 'textLeft', ...article.sectionA },
    article.sectionB && { type: 'imageLeft', ...article.sectionB },
  ].filter(Boolean)

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

        {sections.map((section, i) =>
          section.type === 'textLeft' ? (
            <ContentSectionA
              key={i}
              label={section.label}
              title={section.title}
              titleLine2={section.titleLine2}
              content={section.content}
              quote={section.quote}
              image={section.image}
              editable={editable}
            />
          ) : (
            <ContentSectionB
              key={i}
              label={section.label}
              title={section.title}
              titleLine2={section.titleLine2}
              content={section.content}
              image={section.image}
              editable={editable}
            />
          )
        )}

        <WhySection
          title={article.why.title}
          items={article.why.items}
        />
      </main>

      <ArticleFooter references={article.references} editable={editable} />
    </div>
  )
}
