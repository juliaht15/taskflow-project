import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Manage your tasks with lightning speed and intuitive controls.',
    },
    {
      icon: Sparkles,
      title: 'Beautiful Design',
      description: 'A stunning interface that makes productivity a pleasure.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security.',
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-wix-gradient-1/10 via-transparent to-wix-gradient-3/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wix-accent/10 text-wix-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              New: AI-Powered Task Suggestions
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-gray-900 via-wix-accent to-wix-gradient-3 bg-clip-text text-transparent">
                Organize Your Work,
              </span>
              <br />
              <span className="text-gray-900">Amplify Your Impact</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              TaskFlow helps teams stay aligned, focused, and productive. 
              Create tasks, track progress, and achieve more together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg">Watch Demo</Button>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover={false} className="h-full">
                <div className="p-3 rounded-xl bg-wix-accent/10 w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-wix-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};