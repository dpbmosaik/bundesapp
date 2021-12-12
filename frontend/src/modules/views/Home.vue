<template>
    <HeroSection />
    <Incentives />
    <Features />
    <SideBySideContent />
    <Quote />
    <TeamSection />
    <TextWithImage />
    <CtaSection />
    <Footer />
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HeroSection from '@/common/components/marketing/HeroSection.vue'
import Incentives from '@/common/components/marketing/Incentives.vue'
import Features from '@/common/components/marketing/Features.vue'
import SideBySideContent from '@/common/components/marketing/SideBySideContent.vue'
import Quote from '@/common/components/marketing/Quote.vue'
import TeamSection from '@/common/components/marketing/TeamSection.vue'
import TextWithImage from '@/common/components/marketing/TextWithImage.vue'
import CtaSection from '@/common/components/marketing/CtaSection.vue'
import Footer from '@/common/components/marketing/Footer.vue'

export default {
  name: 'HomeMain',
  components: {
    HeroSection,
    Incentives,
    Features,
    Quote,
    TeamSection,
    TextWithImage,
    CtaSection,
    Footer,
    SideBySideContent
  }
}
</script>
