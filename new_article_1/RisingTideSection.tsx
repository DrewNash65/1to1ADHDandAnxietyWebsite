import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Smartphone, Dna, Apple } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function RisingTideSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-card to-background">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Rising Tide of ADHD and Anxiety
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              There has been a startling increase in both Attention Deficit Hyperactivity Disorder (ADHD) 
              as well as Anxiety in the pediatric population over the past 10-15 years.
            </p>
          </div>
        </ScrollReveal>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">
                    <AnimatedNumber value={15} />+
                  </div>
                  <p className="text-lg font-semibold mb-2">Years of Increase</p>
                  <p className="text-muted-foreground">
                    Rates have been climbing even before the pandemic, which worsened things exponentially
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Multiple</div>
                  <p className="text-lg font-semibold mb-2">Contributing Factors</p>
                  <p className="text-muted-foreground">
                    Technology, genetics, and nutrition all play significant roles
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Contributing factors */}
        <ScrollReveal delay={0.4}>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">Why Is This Happening?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Technology & Screens</h4>
                <p className="text-sm text-muted-foreground">
                  Social media and excessive screen time are frequently implicated factors
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Dna className="w-8 h-8 text-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Genetic Factors</h4>
                <p className="text-sm text-muted-foreground">
                  Hereditary predisposition plays a role in ADHD and anxiety susceptibility
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Diet & Nutrition</h4>
                <p className="text-sm text-muted-foreground">
                  The often-overlooked contributor that deserves more attention
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <p className="text-lg leading-relaxed">
                Processed and "ultra" processed foods, high fructose corn syrup, food additives and dyes 
                have contributed to so many health issues in this country. We know about links between these 
                "foods" and increasing rates of obesity, type 2 diabetes, and metabolic syndrome. Many of 
                these "food products" and additives are not legal in Europe.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
