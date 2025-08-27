import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/utils';

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of sound effects organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((category) => (
            <Link 
              key={category.id} 
              href={`/browse?category=${category.id}`}
              className="group"
            >
              <Card 
                variant="interactive" 
                className="h-32 flex flex-col items-center justify-center text-center transition-all duration-200 group-hover:scale-105"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <span className="text-sm text-blue-600 font-medium">
                  Explore →
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/browse">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              View All Categories →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
