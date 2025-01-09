export default function robots() {
  const Main = process.env.NEXT_PUBLIC_MAIN
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/profil', '/activate','/terms','/search','/register','/profile','/post','/password','/passforget','/outofsite','/following','/activate']
      },
      sitemap: `${Main}/sitemap.xml`,
    }
  }