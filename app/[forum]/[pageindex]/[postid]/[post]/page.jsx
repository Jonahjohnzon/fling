import Body from "./Body";

export async function generateMetadata({ params }) {
  const id = params?.postid;
  const page = params?.post;
  const Main = process.env.NEXT_PUBLIC_MAIN

  if (!page || !id || !params?.forum) {
    return;
  }
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  try {
    const data = await fetch(
      `${Api}/getcomment/${id}?page=${page}`
    );
    const info = await data.json();

    if (!info?.auth) {
      return;
    }

    const title = info?.data?.title;
    const image = info?.data?.image;
    const category = info?.data?.category;
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    return {
      title: {
        default: `Fling Forum || ${title}`,
      },
      openGraph: {
        title: `Fling Forum || ${title}`,
        description: `Check Out "${title}" on our ${category} forum`,
        images: [{ url: image, width: 1200, height: 630 }],
      },
      description: `Check Out "${title}" on our ${category} forum`,
      keywords: [
        `${title}`,
        `${title} forum`,
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
      alternates: {
        canonical: `${Main}/${params.forum}/${params.pageindex}/${params.postid}/${page}${hash}`,
      },
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return;
  }
}

const Display = ({ params }) => {
  return (
    <>
      <Body params={params} />
    </>
  );
};

export default Display;
