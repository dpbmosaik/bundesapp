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
import HeroSection from '../components/marketing/HeroSection.vue'
import Incentives from '../components/marketing/Incentives.vue'
import Features from '../components/marketing/Features.vue'
import SideBySideContent from '../components/marketing/SideBySideContent.vue'
import Quote from '../components/marketing/Quote.vue'
import TeamSection from '../components/marketing/TeamSection.vue'
import TextWithImage from '../components/marketing/TextWithImage.vue'
import CtaSection from '../components/marketing/CtaSection.vue'
import Footer from '../components/marketing/Footer.vue'

export default {
  name: 'Home',
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
