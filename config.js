module.exports = {
  pathPrefix: '',
  siteUrl: 'https://aspected-helios.netlify.app/',
  siteTitle: 'Stellar Explosion',
  siteDescription: 'Zaw\'s portfolio',
  author: 'Zaw',
  postsForArchivePage: 3,
  defaultLanguage: 'ja',
  pages: {
    home: '/',
    blog: 'blog',
    tag: 'tags',
  },
  social: {
    github: 'https://github.com/zoniha',
  },
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT,
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID,
  tags: {
    html: {
      name: 'HTML',
      color: '#f7f8f0',
    },
    css: {
      name: 'CSS',
      color: '#f7f8f0',
    },
    python: {
      name: 'Python',
      color: '#f7f8f0',
    },
    work: {
      name: 'Work',
      color: '#f7f8f0',
    },
  },
};
