import Body from "./Body"
import { Decode } from '@/app/Component/Tab/Encode';


export async function generateMetadata({params}){
  let str = params.title
  let space = Decode(str)
  const Main = process.env.NEXT_PUBLIC_MAIN


return{
  title:{
    default: `Fling Forum || ${space} `},
    openGraph: {
      title: `Fling Forum || ${space} `,
      description: `Check out our ${space} forum `,
      images:[{url:`${Main}/opengraph-image.png`, width:1200, height:630}]
      ,},
  description: `Check out our ${space} forum  `,
  keywords: [
    `${space}`,
    `${space} forum`,
    'forum',
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
  alternates:{
    canonical:`${Main}/thread/${params.title}/${params.pageindex}/${params.type}`
  }
}
}

const Display = ({params}) => {
  

  return (
    <>
    <Body params={params}/>
    </>
  )
}

export default Display