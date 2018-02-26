export default async req => {
  console.log(req.query)
  return {
    success: true,
    component: req.query.topic === 'tweets' ? 'tweet' : 'basic',
    results: [
      {
        id: 1,
        title: 'Title',
        text: 'Text text text',
        timestamp: 1519428840,
        image: {
          type: 'thumbnail',
          url: 'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif'
        },
        link: 'https://www.google.com/'
      }, {
        id: 2,
        title: 'Title 2',
        text: 'Text text text',
        timestamp: 1519727840,
        image: {
          type: 'thumbnail',
          url: 'https://cdn.evance.me/portal/shared/images/placeholder.png'
        },
        link: 'https://www.wikipedia.org/'
      }
    ]
  }
}
