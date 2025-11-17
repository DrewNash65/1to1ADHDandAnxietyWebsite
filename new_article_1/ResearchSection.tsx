import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useState } from "react";

const researchCategories = [
  {
    title: "Omega-3 Fatty Acid Research",
    description: "Multiple high-quality studies demonstrate the effectiveness of Omega-3 supplementation for children with ADHD",
    studies: [
      {
        authors: "Bloch & Qawasmi",
        year: "2011",
        title: "Systematic review and meta-analysis showing Omega-3 fatty acid supplementation significantly improves ADHD symptoms in children",
        journal: "J Am Acad Child Adolesc Psychiatry, 50(10), 991–1000",
      },
      {
        authors: "Chang et al.",
        year: "2018",
        title: "Comprehensive systematic review and meta-analysis confirming benefits of Omega-3 polyunsaturated fatty acids for ADHD",
        journal: "Neuropsychopharmacology, 43(3), 534–545",
      },
      {
        authors: "Chang",
        year: "2021",
        title: "Focus review highlighting Omega-3's role in ADHD management",
        journal: "Frontiers in Psychiatry",
      },
      {
        authors: "Derbyshire",
        year: "2017",
        title: "Evaluation of therapeutic role of Omega-3/6 fatty acids in children and young people with ADHD",
        journal: "J Lipids Health Dis, 16:143",
      },
    ],
  },
  {
    title: "Magnesium, Zinc, and Vitamin D Research",
    description: "Clinical trials support the use of these essential nutrients for improving attention, focus, and sleep in children with ADHD",
    studies: [
      {
        authors: "Hemamy et al.",
        year: "Recent",
        title: "Randomized controlled trial demonstrating vitamin D and magnesium supplementation improves mental health and behavioral problems in children with ADHD",
        journal: "BMC Pediatrics",
      },
      {
        authors: "El Baza et al.",
        year: "Recent",
        title: "Study showing magnesium supplementation benefits children with attention deficit hyperactivity disorder",
        journal: "Egypt J Med Hum Genet",
      },
      {
        authors: "Kalejahi et al.",
        year: "Recent",
        title: "Systematic review examining magnesium status and supplementation effectiveness in children with ADHD",
        journal: "J Pediatr Rev",
      },
    ],
  },
  {
    title: "Gut Microbiome Research",
    description: "Recent research establishes the crucial connection between gut health and mental health in children",
    studies: [
      {
        authors: "Querdasi et al.",
        year: "2025",
        title: "Study linking childhood gut microbiome to internalizing symptoms at school age through functional connectome analysis",
        journal: "Nature Communications",
      },
      {
        authors: "Ou et al.",
        year: "2024",
        title: "Research on gut microbiota development from birth through adolescence and its relationship with anxiety and behavioral difficulties",
        journal: "European Child & Adolescent Psychiatry",
      },
      {
        authors: "Fujihara et al.",
        year: "Recent",
        title: "Study showing altered gut microbiota composition is associated with difficulties in emotion regulation in young children",
        journal: "Research publication",
      },
    ],
  },
];

export function ResearchSection() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Evidence-Based</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Scientific Evidence and Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              All recommendations are supported by well-designed prospective studies and systematic reviews, 
              taking the guesswork out of providing optimal nutrition for children
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {researchCategories.map((category, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCategory === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedCategory === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border">
                        <div className="pt-6 space-y-4">
                          {category.studies.map((study, studyIndex) => (
                            <motion.div
                              key={studyIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: studyIndex * 0.1 }}
                              className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-xs font-bold text-primary">{studyIndex + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="font-semibold">
                                      {study.authors} ({study.year})
                                    </p>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  </div>
                                  <p className="text-sm mb-2">{study.title}</p>
                                  <p className="text-xs text-muted-foreground italic">{study.journal}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Evidence-Based Practice</h3>
                <p className="text-lg leading-relaxed">
                  This growing body of research underscores the importance of considering nutrition as a fundamental 
                  component of comprehensive ADHD and anxiety management in children. By integrating evidence-based 
                  nutritional strategies with other therapeutic approaches, we can provide children with the best 
                  possible foundation for optimal cognitive function and emotional wellbeing.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
