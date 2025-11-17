import { motion } from "framer-motion";
import { XCircle, AlertTriangle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useState } from "react";

const foodsToAvoid = [
  {
    title: "Processed & Ultra-Processed Foods",
    description: "Anything that doesn't look like its original form",
    details: "These foods are stripped of nutrients and loaded with additives that can affect brain function and behavior.",
    icon: "🏭",
  },
  {
    title: "High Fructose Corn Syrup",
    description: "Check ingredient lists carefully",
    details: "HFCS causes rapid blood sugar spikes and crashes, making it harder for children to control emotions and focus.",
    icon: "🌽",
  },
  {
    title: "Artificial Food Dyes",
    description: "Especially Red #40 and synthetic colors",
    details: "Studies link artificial dyes to hyperactivity and attention problems in children. Many are banned in Europe.",
    icon: "🎨",
  },
  {
    title: '"Low Fat" Products',
    description: "Often contain processed sugar replacements",
    details: "When fat is removed, it's usually replaced with HFCS or other ultra-processed ingredients that are worse for health.",
    icon: "🧈",
  },
  {
    title: "Sweetened Beverages",
    description: "Sodas, sports drinks, and fruit juices",
    details: "These cause insulin levels to soar and then crash, making emotional control and focus much more difficult.",
    icon: "🥤",
  },
  {
    title: "Long Ingredient Lists",
    description: "If you can't pronounce it, avoid it",
    details: "Complex chemical names often indicate artificial additives and preservatives that don't belong in a healthy diet.",
    icon: "📋",
  },
];

export function FoodsToAvoidSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Important to Know</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What to Avoid in Your Child's Diet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These foods and ingredients can negatively impact focus, emotional regulation, and overall brain function
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodsToAvoid.map((food, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                className="bg-card border-2 border-secondary/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{food.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg leading-tight">{food.title}</h3>
                      <XCircle className="w-5 h-5 text-secondary flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === index ? "auto" : 0,
                    opacity: expandedCard === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-secondary/20">
                    <p className="text-sm leading-relaxed">{food.details}</p>
                  </div>
                </motion.div>

                {expandedCard !== index && (
                  <div className="mt-4 text-xs text-secondary font-medium">
                    Click to learn more →
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-12 max-w-3xl mx-auto bg-card border-2 border-secondary/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3">The Bottom Line</h3>
                <p className="text-lg leading-relaxed">
                  Read labels carefully. Cheese doesn't come from a can! Anything that has "high fructose corn syrup" 
                  or something similar toward the top of the ingredient list should be put back on the shelf. 
                  These chemicals that are making the American population sick are also making our children 
                  not function at their best.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
