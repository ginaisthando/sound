'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { FilterSidebar } from '@/components/browse/filter-sidebar';
import { FilterDrawer } from '@/components/browse/filter-drawer';
import { PackGrid } from '@/components/browse/pack-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_PACKS } from '@/lib/utils';
import { Filter, Search } from 'lucide-react';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter and sort packs
  const filteredPacks = useMemo(() => {
    let filtered = [...MOCK_PACKS];

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
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(pack =>
        selectedCategories.includes(pack.category)
      );
    }

    // Free only filter
    if (showFreeOnly) {
      filtered = filtered.filter(pack => pack.isFree);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, showFreeOnly, sortBy]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Sound Packs
          </h1>
          
          {/* Search and Mobile Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search sound packs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="md:hidden gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selectedCategories.length > 0 || showFreeOnly) && (
                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {selectedCategories.length + (showFreeOnly ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block flex-shrink-0">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              showFreeOnly={showFreeOnly}
              onFreeOnlyChange={setShowFreeOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredPacks.length} sound pack{filteredPacks.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              
              {/* Desktop Sort (Quick Access) */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Pack Grid */}
            <PackGrid packs={filteredPacks} />

            {/* Load More Button (for pagination in real app) */}
            {filteredPacks.length > 0 && filteredPacks.length % 12 === 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Packs
                </Button>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          showFreeOnly={showFreeOnly}
          onFreeOnlyChange={setShowFreeOnly}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
    </MainLayout>
  );
}
