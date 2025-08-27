import { MainLayout } from '@/components/layout/main-layout';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { FeaturedPacks } from '@/components/home/featured-packs';
import { SubscriptionTeaser } from '@/components/home/subscription-teaser';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedPacks />
      <SubscriptionTeaser />
    </MainLayout>
  );
}