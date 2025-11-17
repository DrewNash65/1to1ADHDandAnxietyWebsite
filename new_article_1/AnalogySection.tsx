import { ScrollReveal } from "./ScrollReveal";

export function AnalogySection() {
  return (
    <section className="py-24 bg-card">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-foreground">
              If I was to build a racecar, I would want all the components to be of the highest quality. 
              The steering, the suspension and the brakes would need to be finely tuned to maximize the 
              handling and ride. Most importantly, if I had a high-performance engine to power that race car, 
              I would put nothing but the best quality fuel in the tank.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-foreground">
              If I went to the trouble of building the race car of my dreams and put low quality fuel in there, 
              I should not be disappointed if the car was not a contender. To go to all that effort and then to 
              not give the finely tuned engine the fuel it deserves, and needs would be ridiculous.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
            <p className="text-lg font-medium text-foreground">
              Don't expect the engine to run optimally if the fuel is of poor quality.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
