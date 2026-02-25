import AdviceHeroSection from './article/AdviceHeroSection'
import AdviceIntroSection from './article/AdviceIntroSection'
import AdvicePhasesSection from './article/AdvicePhasesSection'
import AdviceCtaSection from './article/AdviceCtaSection'
import ArticleFooter from './article/ArticleFooter'

export default function AdvicePreview({ article, editable = true }) {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 antialiased">
      <AdviceHeroSection
        breadcrumb={article.breadcrumb}
        title={article.title}
        titleAccent={article.titleAccent}
        heroImage={article.heroImage}
        editable={editable}
      />

      <main className="print-main max-w-5xl mx-auto px-10 py-20">
        <AdviceIntroSection
          quote={article.intro.quote}
          body={article.intro.body}
        />

        <AdvicePhasesSection phases={article.phases} editable={editable} />

        <AdviceCtaSection
          tag={article.cta.tag}
          title={article.cta.title}
          body={article.cta.body}
          cards={article.cta.cards}
          buttonText={article.cta.buttonText}
          buttonUrl={article.cta.buttonUrl}
        />
      </main>

      <ArticleFooter references={article.references} editable={editable} />
    </div>
  )
}
