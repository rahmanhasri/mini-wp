const serverUrl = 'http://localhost:3000'

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  axios({
    url: serverUrl + '/login/google',
    method : 'post',
    data : { token : id_token }
  })
    .then( ({ data }) => {
      localStorage.setItem('token', data.token)
      app2.logged()
    })
    .catch( ({ response }) => {
      console.log(response.data.message)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });

}

Vue.component('fucking-google',{
  template : `
  <div class="g-signin2" data-onsuccess="onSignIn"></div>
  `
})

const app2 = new Vue({
  el: '#app',
  created() {
    // console.log('test')
    this.getArticles()
    if(localStorage.getItem('token')) {
      this.logged()
    }
  },

  data : {
    articles : [],
    keyword: '',
    loading : false,
    update : false,
    isLogin : false,
    menu : 'article',
    previewImage : '',
    dataChanged : false,
    userArticles : [],
    userTrashes : [],
    detail : null,
    searchResults : []
  },

  computed : {
    filtered() {
      return this.articles.filter( article => article.title.toLowerCase().includes(this.keyword))
    },
  //   myArticles() {
  //     console.log(localStorage.getItem('email'))
  //     console.log(this.articles[0].author)
  //     return this.articles.filter( article => {
  //       console.log(article.author)
  //       return article.author.email == localStorage.getItem('email') 
  //     })
  //   }
  },

  methods: {

    getArticles() {
      axios({
        method: 'get',
        url: serverUrl + '/articles',
        // headers : { token : localStorage.getItem('token')}
      })
        .then( ({data}) => {
          this.articles = data
        })
        .catch( ({response}) => {
          console.log(response)
        })
    },

    getUserArticles(query = 'published') {

      axios({
        method : 'get',
        url: serverUrl + `/user/articles?q=${query}`,
        headers : { token : localStorage.getItem('token')}
      })
        .then( ({ data }) => {
          if(query == 'archived') {
            this.userTrashes = data
          } else {
            this.userArticles = data
          }
        })
        .catch( ({ response }) => {
          let warning = response.data.message || response.statusText
          swal(warning, {
            timer : 2000,
            button : false 
          })
        })
    },

    searchShot(keyword) {
      this.loading = true
      axios({
        method: 'get',
        url : serverUrl + '/articles?q=' + keyword,
        
      })
        .then( ({ data }) => {
          this.loading = false
          this.searchResults = data
          this.menu = 'search'
        })
        .catch( ({ response }) => {
          swal(response.statusText, {
            button : false,
            timer : 2000
          })
        })
    },

    changeMenu(value) {
      this.update = false
      this.previewImage = ''
      this.menu = value
      this.keyword = ''
    },

    searchFilter(keyword) {
      this.keyword = keyword
      this.menu = 'search'
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
      this.menu = 'my-article'
      this.update = false
    },

    createdData(value) {
      this.menu = 'article'
      this.articles.unshift(value)
      this.userArticles.unshift(value)
    },

    deleteData(value) {
      // console.log(value)
      let index = this.articles.findIndex(article => article._id == value.id)
      // console.log(index)
      index != -1 && this.articles.splice(index, 1)
      this.userArticles.splice(value.index, 1)
    },
    archiveData(value) {
      // console.log(value)
      let index = this.articles.findIndex(article => article._id == value.id)
      // console.log(index)
      index != -1 && this.articles.splice(index, 1)
      this.userTrashes.push(this.userArticles[value.index])
      this.userArticles.splice(value.index, 1)
    },

    restoreData(value) {
      // console.log(value)
      this.userArticles.push(this.userTrashes[value.index])
      this.userArticles.sort( (a,b) => new Date(a.created_at) < new Date(b.created_at))
      this.userTrashes.splice(value.index, 1)
    },

    viewDetail(article) {
      // console.log(article)

      this.detail = article
      // console.log(this.detail)
      this.menu = 'details'
    },

    scroll() {
      window.scrollBy(0, -3000);
    },

    logged() {
      // this.alreadyLogin()
      // this.getUserInfo()
      // this.getMyArticles()
      swal('welcome!', {
        button : true,
        timer : 2000
      })
      this.getUserArticles()
      this.getUserArticles('archived')
      this.menu = 'article'
      this.isLogin = true
    },

    logout() {
      // localStorage.removeItem('token')
      if(!localStorage.getItem('email')) {
        signOut()
      }
      localStorage.clear()
      this.isLogin = false
      swal('See you again', {
        timer : 2000
      })
    }
  }
})

