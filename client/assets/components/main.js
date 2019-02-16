const serverUrl = 'http://localhost:3000'

const app2 = new Vue({
  el: '#articles',
  created() {
    // console.log('test')
    axios({
      method: 'get',
      url: serverUrl + '/articles'
    })
      .then( ({data}) => {
        this.articles = data
      })
      .catch( ({response}) => {
        console.log(response)
      })
  },
  data : {
    articles : [],
    keyword: '',
    update : false,
    isLogin : 'menu',
    menu : 'article',
    previewImage : ''
  },
  computed : {
    filtered() {
      return this.articles.filter( article => article.title.toLowerCase().includes(this.keyword))
    }
  },
  methods: {
    toEditor() {
      this.currentPage ='editor'
    }, 
    
    toArticle() {
      this.clearEditor()
      this.currentPage = 'menu'
    },

    updateArticle(article) {
      // this.title = article.title
      // this.text = article.content
      // this.update = article
    },

    deleteArticle(value) {
      this.articles.splice(value, 1)
    },

    changeMenu(value) {
      this.update = false
      this.menu = value
    },

    searchFilter(keyword) {
      this.menu = 'article'
      this.keyword = keyword
    },

    preview(value) {
      this.previewImage = value
    },

    fillForm(article) {
      // console.log(article)
      this.update = article
      this.menu = 'editor'
    },

    updatedData(value) {
      for( key in value) {
        this.update[key] = value[key]
      }
      this.update = false
    }
  }
})