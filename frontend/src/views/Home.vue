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
import HeroSection from '../components/HeroSection.vue'
import Incentives from '../components/Incentives.vue'
import Features from '../components/Features.vue'
import SideBySideContent from '../components/SideBySideContent.vue'
import Quote from '../components/Quote.vue'
import TeamSection from '../components/TeamSection.vue'
import TextWithImage from '../components/TextWithImage.vue'
import CtaSection from '../components/CtaSection.vue'
import Footer from '../components/Footer.vue'

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
