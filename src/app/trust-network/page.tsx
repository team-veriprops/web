'use client'

import { Button } from "@components/3rdparty/ui/button";
import { Card } from "@components/3rdparty/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Shield, TrendingUp, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default function TrustNetworkPage() {
  const features = [
    {
      icon: Shield,
      title: "Verified Trust",
      description: "Every property and person verified to eliminate scams",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Grow your network and earn transparent rewards",
    },
    {
      icon: TrendingUp,
      title: "Progressive Tiers",
      description: "Build your Trust Score and unlock higher multipliers",
    },
  ];

  const benefits = [
    "Earn direct commissions when your referrals transact",
    "Receive indirect rewards from your network's growth",
    "Build Trust Score through verified connections",
    "Climb tiers for higher reward multipliers",
    "Transparent earnings with full audit trail",
    "Community recognition and leaderboard status",
  ];
  const heroTitle = "Protect your network. Build trust. Earn together."
  const heroDescription = "Invite trusted people, help them transact safely, and grow your Trust Score."
  const mission = ""
  const purpose = ""

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-accent-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur">
              <Shield className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                {"Let's Bring Back Sanity to Nigeria's Real Estate Deals"}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
              {heroTitle}
            </h1>
            <p className="mb-8 text-xl text-primary-foreground/90 md:text-2xl">
              {heroDescription}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => redirect("/signup")}
                className="text-lg"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => redirect("/login")}
                className="border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg backdrop-blur"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-success font-semibold">
                <Shield className="h-5 w-5" />
                Our Mission
              </div>
              <h2 className="text-3xl font-heading font-bold">
                Eliminating property scams
              </h2>
              <p className="text-muted-foreground text-justify text-lg">
                Veriprops is building a trusted, community-driven marketplace where every land and building is verified.
                Together, we connect honest sellers, empower safe buyers, and make property scams a thing of the past — one
                verified deal at a time.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-success font-semibold">
                <Users className="h-5 w-5" />
                Our Purpose
              </div>
              <h2 className="text-3xl font-heading font-bold">
                Building a trusted network
              </h2>
              <p className="text-muted-foreground text-justify text-lg">
                The VTN empowers every member to build, measure, and reward verified trust. As an Inviter, Influencer, and
                Affiliate by default, you bring trusted people into Veriprops — and the network transparently rewards
                genuine, verified activity.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <Card className="border-2 border-primary/20 bg-primary-lighter p-8 md:p-12">
              <div className="space-y-6 text-center">
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-lg leading-relaxed text-foreground">
                  {mission}
                </p>
                <div className="pt-4">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Our Purpose</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {purpose}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three pillars of trust-first growth
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-6 hover:shadow-card transition-shadow">
                    <div className="mb-4 inline-flex rounded-lg bg-primary-lighter p-3">
                      <Icon className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
              What You Get
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 shrink-0 text-success" />
                  <p className="text-foreground">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent-foreground/80 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Build Trust?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              Join thousands of Nigerians making property transactions safer for everyone.
            </p>
            <Button
              size="lg"
              variant="cta"
              onClick={() => redirect("/signup")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
