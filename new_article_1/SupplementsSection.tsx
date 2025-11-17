import { motion } from "framer-motion";
import { Pill, Brain, Moon, Zap, Heart } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const supplements = [
  {
    name: "Omega-3 Fatty Acids",
    ratio: "EPA:DHA 2:1 ratio",
    benefits: [
      "Improved emotional regulation",
      "Enhanced focus and attention",
      "Reduced hyperactivity symptoms",
      "Better cognitive function",
    ],
    evidence: "Multiple well-designed studies show significant improvements in ADHD symptoms",
    icon: Brain,
    color: "primary",
  },
  {
    name: "Magnesium",
    ratio: "The calming electrolyte",
    benefits: [
      "Improved attention and focus",
      "Better sleep quality",
      "Reduced anxiety",
      "Enhanced emotional regulation",
    ],
    evidence: "Clinical trials demonstrate benefits for mental health and behavioral problems",
    icon: Moon,
    color: "accent",
  },
  {
    name: "Vitamin D3",
    ratio: "Essential for brain health",
    benefits: [
      "Mood regulation support",
      "Enhanced cognitive function",
      "Improved behavioral outcomes",
      "Immune system support",
    ],
    evidence: "Studies show vitamin D supplementation improves mental health in children with ADHD",
    icon: Zap,
    color: "primary",
  },
  {
    name: "Zinc",
    ratio: "Neurotransmitter support",
    benefits: [
      "Enhanced attention span",
      "Better impulse control",
      "Improved neurotransmitter function",
      "Supports brain development",
    ],
    evidence: "Research links zinc supplementation to improved ADHD symptoms",
    icon: Zap,
    color: "accent",
  },
  {
    name: "Probiotics",
    ratio: "Gut-brain connection",
    benefits: [
      "Mood stability support",
      "Reduced anxiety symptoms",
      "Better emotional regulation",
      "Enhanced gut health",
    ],
    evidence: "Emerging research shows gut microbiome influences mood and behavior",
    icon: Heart,
    color: "accent",
  },
];

export function SupplementsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Pill className="w-5 h-5" />
              <span className="font-semibold">Evidence-Based Supplements</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Essential Nutrients for Growing Brains
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Well-designed prospective studies show these supplements can help improve emotional regulation, 
              focus, and sleep in children with ADHD and anxiety
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {supplements.map((supplement, index) => {
            const Icon = supplement.icon;
            const isAccent = supplement.color === "accent";
            
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Header */}
                    <div className="lg:col-span-1">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
                        isAccent ? "bg-accent/10" : "bg-primary/10"
                      } mb-4`}>
                        <Icon className={`w-7 h-7 ${isAccent ? "text-accent" : "text-primary"}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{supplement.name}</h3>
                      <p className={`text-sm font-medium ${
                        isAccent ? "text-accent" : "text-primary"
                      }`}>
                        {supplement.ratio}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {supplement.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1 ${isAccent ? "text-accent" : "text-primary"}`}>•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Evidence */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                        Scientific Evidence
                      </h4>
                      <p className="text-sm leading-relaxed bg-muted/50 rounded-lg p-4">
                        {supplement.evidence}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">What Growing Brains Need</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Healthy fats, especially Omega fatty acids, are crucial for brain development. Several well-constructed 
                  studies show that supplementing with specific Omega-3 fatty acids (EPA to DHA in a 2:1 or higher ratio) 
                  will help improve emotional regulation and focus in children.
                </p>
                <p className="text-lg leading-relaxed">
                  Similarly, studies show that supplementing with vitamin D3, magnesium and zinc (the calming electrolytes) 
                  will help not only attention and focus but also sleep. Using well-designed prospective studies can help 
                  take the guesswork out of providing optimal nutrition for your children.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
