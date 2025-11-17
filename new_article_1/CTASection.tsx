import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { Button } from "./ui/button";

const keyTakeaways = [
  "Quality nutrition is essential fuel for your child's developing brain",
  "Avoid processed foods, artificial additives, and sweetened beverages",
  "Focus on wholesome foods, proteins, healthy fats, and complex carbohydrates",
  "Consider evidence-based supplements like Omega-3s, magnesium, and vitamin D",
  "Support gut health through probiotic foods and fiber",
  "Take a comprehensive approach that combines nutrition with other treatment strategies",
];

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl relative z-10">
        {/* Key Takeaways */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Key Takeaways</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Remember These Essential Points
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {keyTakeaways.map((takeaway, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{takeaway}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Main CTA */}
        <ScrollReveal delay={0.6}>
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Support Your Child's Success?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              If you're concerned about your child's nutrition and its impact on ADHD or anxiety symptoms, 
              schedule a consultation to develop a comprehensive approach that includes nutritional guidance, 
              behavioral strategies, and medical support when needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Comprehensive Approach */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Our Comprehensive Approach</h3>
              <p className="text-lg leading-relaxed mb-4">
                At <strong>1-to-1 ADHD & Anxiety Solutions</strong>, we take the topic of child nutrition seriously. 
                If we are addressing your child's struggles with attention and/or anxiety and are considering prescribing 
                a medication to help alleviate these problems, we should definitely ensure that the fuel going into the 
                engine is of the best quality possible.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                In this day and age of busy schedules, TV and online advertisements, and limited time to prepare meals, 
                maximizing your child's nutrition can be next to impossible. Consequently, we have arranged a team of 
                online nutritional counsellors and dieticians to work with children and parents to help navigate the 
                modern world of food choices.
              </p>
              <p className="text-lg leading-relaxed">
                Children and families who join this practice will have their dietary status addressed and be referred 
                for nutritional counselling as part of their ongoing management. Nutrition is just one aspect of the 
                multi-dimensional approach that both makes this practice unique and will allow parents to help their 
                children maximize their academic and social functioning and happiness.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Final note */}
        <ScrollReveal delay={1.0}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground italic max-w-3xl mx-auto">
              Every child is unique, and nutritional needs may vary. Working with healthcare professionals who 
              understand both ADHD/anxiety and nutrition can help you develop a personalized plan that supports 
              your child's optimal functioning and wellbeing.
            </p>
            <div className="mt-8">
              <p className="text-2xl font-bold">Ready, set……..GO!</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
