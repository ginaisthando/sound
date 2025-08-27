import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Download, Headphones } from 'lucide-react';

export function SubscriptionTeaser() {
  const benefits = [
    {
      icon: <Download className="h-5 w-5" />,
      title: 'Unlimited Downloads',
      description: 'Download as many sound packs as you want'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Early Access',
      description: 'Get first access to new releases and exclusive content'
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      title: 'Premium Quality',
      description: 'Access to high-fidelity audio files and stems'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unlock Unlimited Creativity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of creators who trust Sound Bite for their audio needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} variant="gradient" className="text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Preview */}
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Start Your Creative Journey
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Access to 10,000+ sound packs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Commercial license included</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">New content added weekly</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Cancel anytime</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center lg:justify-start gap-2">
                      <span className="text-4xl font-bold text-gray-900">R337</span>
                      <span className="text-lg text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Start with a 7-day free trial
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link href="/subscription">
                      <Button size="lg" className="w-full sm:w-auto">
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link href="/subscription">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        View All Plans
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by creators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Netflix</div>
            <div className="text-2xl font-bold text-gray-400">Spotify</div>
            <div className="text-2xl font-bold text-gray-400">Adobe</div>
            <div className="text-2xl font-bold text-gray-400">YouTube</div>
          </div>
        </div>
      </div>
    </section>
  );
}
