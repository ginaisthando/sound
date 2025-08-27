import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Gift, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  // In a real app, you'd get the order details from the URL params or API
  const orderNumber = 'SB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Purchase is Complete!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. Your sound packs are ready for download.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Order #{orderNumber}
          </p>

          {/* Download Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Download Your Files
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Your purchase includes high-quality audio files and commercial license.
                Download links have been sent to your email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download All Files
                </Button>
                <Button variant="outline" size="lg">
                  View Order Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">🎵</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">High-Quality Audio</div>
                  <div className="text-sm text-gray-600">WAV & MP3 formats</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">📄</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Commercial License</div>
                  <div className="text-sm text-gray-600">Use in any project</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-bold">🔄</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Lifetime Access</div>
                  <div className="text-sm text-gray-600">Re-download anytime</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-bold">💯</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Money-Back Guarantee</div>
                  <div className="text-sm text-gray-600">30 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Upsell */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-8">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <Gift className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Want More? Upgrade to Unlimited
              </h3>
              <p className="text-gray-600 mb-4">
                Get access to our entire library with unlimited downloads for just R337/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/subscription">
                  <Button className="gap-2">
                    <Gift className="h-4 w-4" />
                    Upgrade to Unlimited
                  </Button>
                </Link>
                <Button variant="outline">
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button variant="outline" className="gap-2">
                Browse More Packs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@soundbite.com" className="text-blue-600 hover:text-blue-700">
                support@soundbite.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
