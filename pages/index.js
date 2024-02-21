import { getAllPosts } from 'lib/api'
import Meta from 'components/meta'
import Container from 'components/container'
import Hero from 'components/hero'
import Posts from 'components/posts'
import Pagination from 'components/pagination'
import { getPlaiceholder } from 'plaiceholder'
import { eyecatchLocal } from 'lib/constants'
import { getImageBuffer } from 'lib/getImageBuffer'

const Home = ({ posts }) => {
  return (
    <Container>
      <Meta />
      <Hero title='CUBE' subtitle='アウトプットしてくサイト' imageOn />
      <Posts posts={posts} />
      <Pagination nextUrl='/blog' nextText='More Posts' />
    </Container>
  )
}

export async function getStaticProps () {
  const posts = await getAllPosts(4)

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const ImageBuffer = await getImageBuffer(post.eyecatch.url)
    const { base64 } = await getPlaiceholder(ImageBuffer)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      posts: posts
    }
  }
}

export default Home
