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
    update : false,
    isLogin : false,
    menu : 'article',
    previewImage : '',
    dataChanged : false,
    userArticles : []
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

    getUserArticles() {
      // axios({
      //   method : 'get',
      //   url: serverUrl + '/user',
      //   headers : { token : localStorage.getItem('token')}
      // })
      //   .then( ({ data }) => {
      //     this.user = data
      //   })
      //   .catch( ({ response }) => {
      //     let warning = response.data.message || response.statusText
      //     swal(warning, {
      //       timer: 2000,
      //     })
      //   })
      axios({
        method : 'get',
        url: serverUrl + '/user/articles',
        headers : { token : localStorage.getItem('token')}
      })
        .then( ({ data }) => {
          this.userArticles = data
        })
        .catch( ({ response }) => {
          let warning = response.data.message || response.statusText
          swal(warning, {
            timer : 2000,
            button : false 
          })
        })
    },
    // toEditor() {
    //   this.currentPage ='editor'
    // }, 
    
    // toArticle() {
    //   this.clearEditor()
    //   this.currentPage = 'menu'
    // },

    // updateArticle(article) {
    //   // this.title = article.title
    //   // this.text = article.content
    //   // this.update = article
    // },

    changeMenu(value) {
      this.update = false
      this.menu = value
      this.previewImage = ''
      this.keyword = ''
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
      this.menu = 'my-article'
      this.update = false
    },

    createdData(value) {
      this.menu = 'article'
      this.articles.unshift(value)
      this.userArticles.unshift(value)
    },

    deleteData(value) {
      console.log(value)
      let index = this.articles.findIndex(article => article._id == value.id)
      console.log(index)
      index != -1 && this.articles.splice(value.index, 1)
      this.userArticles.splice(value, 1)
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

