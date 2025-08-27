'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Crown, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for hobbyists and beginners',
      icon: <Star className="h-6 w-6" />,
      price: { monthly: 159, yearly: 1595 },
      features: [
        '10 downloads per month',
        'Standard quality (MP3)',
        'Basic commercial license',
        'Email support',
        'Access to free packs',
      ],
      limitations: [
        'No WAV files',
        'Limited to 10 downloads',
        'No priority support',
      ],
      popular: false,
      color: 'gray',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Most popular for content creators',
      icon: <Zap className="h-6 w-6" />,
      price: { monthly: 337, yearly: 3368 },
      features: [
        'Unlimited downloads',
        'High quality (WAV + MP3)',
        'Full commercial license',
        'Priority support',
        'Early access to new packs',
        'Stems and loops included',
        'Advanced search filters',
      ],
      limitations: [],
      popular: true,
      color: 'blue',
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      description: 'For professionals and agencies',
      icon: <Crown className="h-6 w-6" />,
      price: { monthly: 691, yearly: 6912 },
      features: [
        'Everything in Pro',
        'Team collaboration (5 seats)',
        'Custom licensing options',
        'Dedicated account manager',
        'API access',
        'White-label options',
        'Custom sample creation',
        'Exclusive premium content',
      ],
      limitations: [],
      popular: false,
      color: 'purple',
    },
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
    },
    {
      question: 'What happens to my downloads if I cancel?',
      answer: 'You keep all the files you\'ve downloaded during your subscription period. However, you won\'t be able to download new files after cancellation.',
    },
    {
      question: 'Can I use the sounds commercially?',
      answer: 'Yes, all our plans include commercial licensing. You can use the sounds in your commercial projects, client work, and monetized content.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 7-day free trial for the Pro plan. No credit card required to start.',
    },
    {
      question: 'What file formats do you provide?',
      answer: 'Basic plan includes MP3 files. Pro and Unlimited plans include both WAV and MP3 formats, with stems and loops where available.',
    },
    {
      question: 'How does team collaboration work?',
      answer: 'The Unlimited plan includes 5 team seats. Team members can share collections, collaborate on projects, and access the same premium content.',
    },
  ];

  const getColorClasses = (color: string, popular: boolean) => {
    const baseClasses = popular ? 'ring-2 ring-blue-500 ring-offset-2' : '';
    
    switch (color) {
      case 'blue':
        return `${baseClasses} border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100`;
      case 'purple':
        return `${baseClasses} border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100`;
      default:
        return `${baseClasses} border-gray-200`;
    }
  };

  const getButtonClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-gray-900 hover:bg-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="py-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get unlimited access to thousands of high-quality sound effects and music packs. 
            Start your creative journey today.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'font-semibold' : 'text-gray-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'font-semibold' : 'text-gray-600'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge variant="success" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${getColorClasses(plan.color, plan.popular)}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      plan.color === 'blue' ? 'bg-blue-600 text-white' :
                      plan.color === 'purple' ? 'bg-purple-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-gray-900">
                      R{plan.price[billingCycle]}
                      <span className="text-lg font-normal text-gray-600">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-gray-600">
                        R{(plan.price.yearly / 12).toFixed(0)}/month billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                            <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full ${getButtonClasses(plan.color)}`}
                    size="lg"
                  >
                    {plan.id === 'basic' ? 'Get Started' : 
                     plan.id === 'pro' ? 'Start Free Trial' : 
                     'Contact Sales'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    {plan.id === 'pro' ? '7-day free trial • No credit card required' :
                     plan.id === 'unlimited' ? 'Custom pricing available' :
                     'Cancel anytime'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Trusted by creators worldwide
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Netflix</div>
              <div className="text-2xl font-bold text-gray-400">Spotify</div>
              <div className="text-2xl font-bold text-gray-400">Adobe</div>
              <div className="text-2xl font-bold text-gray-400">YouTube</div>
            </div>
            <div className="mt-8 text-sm text-gray-600">
              <p>💯 30-day money-back guarantee • 🔒 Secure payment • ⚡ Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
