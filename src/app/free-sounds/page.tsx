'use client';

import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PackGrid } from '@/components/browse/pack-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_PACKS, CATEGORIES } from '@/lib/utils';
import { Search, Download, Gift, Star, Users } from 'lucide-react';

export default function FreeSoundsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Filter only free packs
  const freePacks = MOCK_PACKS.filter(pack => pack.isFree);

  // Filter and search free packs
  const filteredPacks = useMemo(() => {
    let filtered = [...freePacks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pack =>
        pack.title.toLowerCase().includes(query) ||
        pack.description.toLowerCase().includes(query) ||
        pack.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(pack => pack.category === selectedCategory);
    }

    // Sort by downloads (most popular first)
    filtered.sort((a, b) => b.downloads - a.downloads);

    return filtered;
  }, [searchQuery, selectedCategory, freePacks]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                <Gift className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Free Sounds — Start Creating Today
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Discover high-quality sound effects and music packs at no cost. 
              Perfect for getting started or trying out new styles.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search free sound packs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-white"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{freePacks.length}+</div>
                <div className="text-sm text-green-100">Free Packs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {freePacks.reduce((sum, pack) => sum + pack.trackCount, 0)}+
                </div>
                <div className="text-sm text-green-100">Free Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-green-100">Commercial Use</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredPacks.length > 0 ? 'Free Sound Packs' : 'No Results Found'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredPacks.length} free pack{filteredPacks.length !== 1 ? 's' : ''} available
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Free Packs Grid */}
        {filteredPacks.length > 0 ? (
          <PackGrid packs={filteredPacks} />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No free packs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or category filter
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Sign Up CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Want Even More Free Sounds?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Sign up for a free account to get access to exclusive free packs, 
                save your favorites, and receive notifications when new free content is available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Exclusive free packs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-green-500" />
                    <span>Unlimited downloads</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Button size="lg" className="gap-2">
                  <Users className="h-4 w-4" />
                  Sign Up for More Free Sounds
                </Button>
                <Button variant="outline" size="lg">
                  Browse Premium Packs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Download className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Download
            </h3>
            <p className="text-gray-600">
              Download immediately after clicking. No registration required for free sounds.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Badge className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Commercial License
            </h3>
            <p className="text-gray-600">
              Use in your commercial projects without any additional fees or royalties.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Star className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              High Quality
            </h3>
            <p className="text-gray-600">
              Professional-grade audio files at 44.1kHz/24-bit quality or higher.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
