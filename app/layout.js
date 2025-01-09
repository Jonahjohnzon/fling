import { Dosis } from "next/font/google";
import "./globals.css";
import Body from "./Body";

const inter = Dosis({ subsets: ["latin"] });
const Main = process.env.NEXT_PUBLIC_MAIN

export const metadata = {
  title:{
    default: 'Fling Forum'},
    metadataBase: new URL(Main),
    openGraph: {
      title: 'Fling Forum ',
      description: 'Forum for Erotic Contents',
      images:[{url:`${Main}/opengraph-image.png`, width:1200, height:630}]
      ,
      url:Main,
      type:"website"
      ,
    twitter:{
      card:"summary_large_image"
    }
     
    }
,
  description: 'Forum for Erotic Content lovers',
  keywords: [
    'erotic content',
    'erotic forum',
    'adult stories',
    'erotic literature',
    'sensual tales',
    'online erotica',
    'erotic art',
    'erotic photography',
    'adult comics',
    'NSFW content',
    'fantasy erotica',
    'fetish stories',
    'BDSM content',
    'romantic erotica',
    'taboo erotica',
    'steamy novels',
    'adult fanfiction',
    'personal fantasies',
    'intimate storytelling',
    'kink exploration',
    'sensual experiences',
    'roleplay ideas',
    'adult entertainment',
    'sensual poetry',
    'sexual fantasies',
    'fetish discussions',
    'spicy content',
    'explicit art',
    'adult communities',
    'amateur erotica',
    'intimate confessions',
    'online sensuality',
    'erotic reviews',
    'adult writing tips',
    'sex-positive discussions',
    'exploring kinks',
    'NSFW storytelling',
    'intimacy inspiration',
    'adult videos',
    'steamy dialogues',
    'provocative art',
    'sensual sketches',
    'NSFW memes',
    'romantic fantasies',
    'creative intimacy',
    'intimate moments',
    'adult humor',
    'pleasure exploration',
    'seductive ideas',
    'roleplay guides',
    'visual erotica',
    'fantasy fulfillment',
    'sexual expression',
    'exploring taboos',
    'kinky creativity',
    'provocative themes',
    'erotic workshops',
    'writing erotica',
    'sensual games',
    'adult communities',
    'adult content guidelines',
    'safe exploration',
    'kink-friendly discussions'
  ]
,  
  creator: 'Mid9it',
  alternates:{
    canonical:Main
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-thumb-metal  scrollbar-track-transparent scrollbar-thin  select-none">
       <head><meta name="monetag" content="7aeece893954aa98d10a7f34691f1d31"/>
       </head>
      <Body className={inter.className} children={children}/>
    </html>
  );
}
