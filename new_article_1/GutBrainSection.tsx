import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Activity } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function GutBrainSection() {
  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Activity className="w-5 h-5" />
              <span className="font-semibold">Emerging Science</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Gut-Brain Connection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Research increasingly shows that gut health plays a crucial role in emotional regulation and mental wellbeing
            </p>
          </div>
        </ScrollReveal>

        {/* Animated diagram */}
        <div ref={diagramRef} className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Gut */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-card border-2 border-accent rounded-2xl p-8 shadow-lg text-center">
                  <div className="text-6xl mb-4">🦠</div>
                  <h3 className="text-2xl font-bold mb-2">Gut Microbiome</h3>
                  <p className="text-sm text-muted-foreground">
                    Trillions of bacteria in the digestive system
                  </p>
                </div>
              </motion.div>

              {/* Connection arrows */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <motion.div
                    animate={isInView ? {
                      x: [0, 10, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-12 h-12 text-primary hidden md:block" />
                  </motion.div>
                  <div className="md:hidden">
                    <motion.div
                      animate={isInView ? {
                        y: [0, 10, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rotate-90"
                    >
                      <ArrowRight className="w-12 h-12 text-primary" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="bg-primary/10 rounded-full px-6 py-3">
                  <p className="text-sm font-semibold text-primary">Gut-Brain Axis</p>
                </div>

                <div className="relative">
                  <motion.div
                    animate={isInView ? {
                      x: [0, -10, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="rotate-180"
                  >
                    <ArrowRight className="w-12 h-12 text-accent hidden md:block" />
                  </motion.div>
                  <div className="md:hidden">
                    <motion.div
                      animate={isInView ? {
                        y: [0, -10, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="-rotate-90"
                    >
                      <ArrowRight className="w-12 h-12 text-accent" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Brain */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-lg text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-bold mb-2">Brain & Mood</h3>
                  <p className="text-sm text-muted-foreground">
                    Emotional regulation and behavior
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Research findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ScrollReveal delay={0.3}>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Early Childhood Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Studies show that the composition of gut bacteria in early childhood can predict internalizing 
                symptoms like anxiety later in life. The gut microbiome established in the first years appears 
                to have lasting effects on emotional health.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Behavioral Outcomes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Research on gut microbiota development from birth through adolescence shows clear relationships 
                with anxiety and behavioral difficulties. Altered gut microbiome composition is associated with 
                difficulties in emotion regulation in young children.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">The Microbiome Connection</h3>
            <p className="text-lg leading-relaxed mb-4">
              More and more research indicates that the "microbiome" or healthy bacteria in an individual's gut 
              can influence not just risk of disease long term but mood and levels of anxiety as well.
            </p>
            <p className="text-lg leading-relaxed">
              This gut-brain axis appears to play a crucial role in emotional regulation and behavioral outcomes. 
              Supporting gut health through probiotic foods and fiber-rich wholesome foods may be an important strategy 
              for managing ADHD and anxiety symptoms.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
