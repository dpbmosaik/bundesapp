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
import HeroSection from '@/modules/marketing/components/HeroSection.vue'
import Incentives from '@/modules/marketing/components/Incentives.vue'
import Features from '@/modules/marketing/components/Features.vue'
import SideBySideContent from '@/modules/marketing/components/SideBySideContent.vue'
import Quote from '@/modules/marketing/components/Quote.vue'
import TeamSection from '@/modules/marketing/components/TeamSection.vue'
import TextWithImage from '@/modules/marketing/components/TextWithImage.vue'
import CtaSection from '@/modules/marketing/components/CtaSection.vue'
import Footer from '@/modules/marketing/components/Footer.vue'

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
