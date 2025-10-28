import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import ReferrerNavLinksComponent from "../ReferrerNavLinksComponent";
import { PageDetails } from "types/models";

export default function LeaderboardHero({ title, description }: PageDetails) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-reward/10 border-b border-border"
    >
      <div className="relative container mx-auto px-4 text-center py-16">
        <div className="absolute top-2 right-6">
          <ReferrerNavLinksComponent />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            {/* static blurred glow */}
            <div className="absolute inset-0 rounded-full bg-reward/10 blur-2xl"></div>

            {/* opacity pulsing layer */}
            <div className="absolute inset-0 rounded-full bg-reward/100 blur-2xl animate-pulse"></div>

            <Trophy className="relative h-20 w-20 text-reward" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 text-4xl font-bold text-foreground md:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
