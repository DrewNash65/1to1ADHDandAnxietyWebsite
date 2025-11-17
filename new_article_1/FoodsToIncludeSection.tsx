import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const nutritionBlocks = [
  {
    title: "Complete Proteins",
    foods: ["Eggs", "Lean meats", "Fish", "Beans with whole grains", "Tofu", "Hummus"],
    benefit: "Nourish the body and maintain even blood sugar levels",
    color: "from-primary/20 to-primary/5",
    icon: "🥚",
  },
  {
    title: "Complex Carbohydrates",
    foods: ["Whole grains", "Sweet potatoes", "Legumes", "Brown rice", "Quinoa", "Oats"],
    benefit: "Provide sustained energy and stable glucose levels",
    color: "from-accent/20 to-accent/5",
    icon: "🌾",
  },
  {
    title: "Fresh Fruits & Vegetables",
    foods: ["Berries", "Leafy greens", "Colorful vegetables", "Apples", "Bananas", "Carrots"],
    benefit: "Natural fiber and micronutrients for balanced gut health",
    color: "from-accent/20 to-accent/5",
    icon: "🥗",
  },
  {
    title: "Healthy Fats",
    foods: ["Nuts", "Seeds", "Avocado", "Olive oil", "Fatty fish", "Nut butters"],
    benefit: "Essential for brain development and slow carb absorption",
    color: "from-primary/20 to-primary/5",
    icon: "🥑",
  },
  {
    title: "Probiotic Foods",
    foods: ["Yogurt", "Kefir", "Fermented vegetables", "Kombucha", "Sauerkraut", "Kimchi"],
    benefit: "Support gut-brain connection and mood stability",
    color: "from-accent/20 to-accent/5",
    icon: "🥛",
  },
];

export function FoodsToIncludeSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Fuel for Success</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What to Include in Your Child's Diet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These nutritional building blocks provide the foundation for better focus, emotional regulation, and overall wellbeing
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {nutritionBlocks.map((block, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-accent/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-br ${block.color} p-6 border-b border-accent/20`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{block.icon}</span>
                    <h3 className="text-2xl font-bold">{block.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{block.benefit}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {block.foods.map((food, foodIndex) => (
                      <div
                        key={foodIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{food}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Power of Whole Foods</h3>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      <strong>Protein</strong> from meats, eggs, beans and whole grains together, tofu, and hummus 
                      will nourish your child, fuel their body, and maintain even blood sugar levels.
                    </p>
                    <p>
                      <strong>Fruits and vegetables</strong> (not their juices) have natural fibers that slow down 
                      digestion and promote a balanced microbiome in the gut. Research increasingly shows that the 
                      gut microbiome can influence not just long-term disease risk but also mood and anxiety levels.
                    </p>
                    <p>
                      <strong>Healthy fats</strong> from nuts, fish, and even dairy in moderate amounts are essential 
                      for brain development, especially Omega-3s. Fats also slow down digestion, allowing carbohydrates 
                      to be absorbed more slowly for sustained energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
