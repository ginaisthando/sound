'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/utils';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  showFreeOnly: boolean;
  onFreeOnlyChange: (freeOnly: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  showFreeOnly,
  onFreeOnlyChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    onFreeOnlyChange(false);
    onSortChange('newest');
  };

  const hasActiveFilters = selectedCategories.length > 0 || showFreeOnly;

  return (
    <div className="w-80 space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700"
              >
                Clear all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {showFreeOnly && (
                <Badge variant="secondary" className="text-xs">
                  Free Only
                  <button
                    onClick={() => onFreeOnlyChange(false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategories.map(categoryId => {
                const category = CATEGORIES.find(c => c.id === categoryId);
                return category ? (
                  <Badge key={categoryId} variant="secondary" className="text-xs">
                    {category.name}
                    <button
                      onClick={() => handleCategoryToggle(categoryId)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sort by</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CATEGORIES.map(category => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => onFreeOnlyChange(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Free only</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
