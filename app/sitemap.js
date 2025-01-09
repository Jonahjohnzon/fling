export default async function sitemap() {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const Main = process.env.NEXT_PUBLIC_MAIN
    const res = await fetch(`${Api}/get`);
    const resu = await res.json();
    const result = resu.commentsArray
    const Encode = (s) => {
      return s?.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "") //remove diacritics
      .replace(/\s+/g, '-') //spaces to dashes
      .replace(/&/g, '-and-') //ampersand to and
      .replace(/[^\w\-]+/g, '') //remove non-words
      .replace(/\-\-+/g, '-') //collapse multiple dashes
      .replace(/^-+/, '') //trim starting dash
      .replace(/-+$/, '')
      .replace(/\//g, '-or-'); //trim ending dash
  }
 
  const post = result.map((pos) => {
    const sequence = parseInt(pos?.sequence, 10); // Convert sequence to an integer
    const page = Math.ceil(sequence / 15); // Calculate the page number

    return {
        url: `${Main}/${Encode(pos?.postCategory)}/${Encode(pos?.postTitle)}/${pos.postId}/${page}#post-${pos?.sequence}`,
        lastModified: new Date(pos.updatedAt),
    };
});
  
    return [
      {
        url: Main,
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: `${Main}/thread/Trending-Movies/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Self-Promotion/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Requests/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Trending-Movies/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Trending-Series/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Video-Share/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Snapchat/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}//Twitter-Videos/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Instagram-Videos/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Reddit/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Others/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Strip-Chat/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Onlyfans/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Snapchat-Premuim/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Other-Sites/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Nigeria/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/SouthAfrica/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Kenya/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/thread/Ghana/1/latest`,
        lastModified: new Date(),
      },
      {
        url: `${Main}/hread/Other-Countries/1/latest`,
        lastModified: new Date(),
      },
      ...post,
    ];
  }
  