import { RacecarHero } from "@/components/RacecarHero";
import { AnalogySection } from "@/components/AnalogySection";
import { RisingTideSection } from "@/components/RisingTideSection";
import { FoodsToAvoidSection } from "@/components/FoodsToAvoidSection";
import { FoodsToIncludeSection } from "@/components/FoodsToIncludeSection";
import { SupplementsSection } from "@/components/SupplementsSection";
import { GutBrainSection } from "@/components/GutBrainSection";
import { ResearchSection } from "@/components/ResearchSection";
import { CTASection } from "@/components/CTASection";
import { ReadingProgress } from "@/components/ReadingProgress";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ReadingProgress />
      
      <RacecarHero />
      <AnalogySection />
      <RisingTideSection />
      <FoodsToAvoidSection />
      <FoodsToIncludeSection />
      <SupplementsSection />
      <GutBrainSection />
      <ResearchSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 1-to-1 ADHD & Anxiety Solutions. All rights reserved.</p>
          <p className="mt-2">
            This information is for educational purposes and should not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
