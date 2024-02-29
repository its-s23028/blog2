import randomWordWikipedia from 'random-word-wikipedia'
import axios from 'axios'

const MyPage = ({ randomArticle }) => {
  return (
    <div>
      <h1>Random Wikipedia Article</h1>
      {randomArticle && (
        <div>
          <h2>{randomArticle.title}</h2>
          <p>{randomArticle.extract}</p>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps () {
  try {
    // ランダムな単語を取得
    const randomWords = await randomWordWikipedia('ja', 1) // 1つの単語を取得する

    // Wikipedia APIを使用して単語に関する記事を取得
    const keyword = encodeURIComponent(randomWords[0]) // 単語をエンコード
    const apiUrl = `http://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${keyword}`

    const response = await axios.get(apiUrl)
    const pageId = Object.keys(response.data.query.pages)[0]
    const randomArticle = response.data.query.pages[pageId]

    return {
      props: {
        randomArticle
      }
    }
  } catch (error) {
    console.error('Failed to fetch random Wikipedia article:', error)
    return {
      props: {
        randomArticle: null
      }
    }
  }
}

export default MyPage
