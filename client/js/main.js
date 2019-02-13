
const serverUrl = 'http://localhost:3000'

const app2 = new Vue({
  el: '#articles',
  created() {

    axios({
      method: 'get',
      url: serverUrl + '/articles'
    })
      .then( ({data}) => {
        this.articles = [...data]
      })
      .catch( ({response}) => {
        console.log(response)
      })
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data : {
    articles : [],
    text: '',
    title: '',
    keyword: '',
    update : false
  },
  computed : {
    filtered() {
      return this.articles.filter( article => article.title.toLowerCase().includes(this.keyword))
    }
  },
  methods: {
    clearEditor() {
      this.title = ''
      this.text = ''
      this.update = false
    },
    updateArticle(article) {
      this.title = article.title
      this.text = article.content
      this.update = article
    },
    submit() {
      axios({
        method: 'post',
        url: serverUrl + '/articles',
        data : {
          title : this.title,
          content : this.text
        }
      })
        .then( ({ data }) => {
          // console.log(data)
          this.articles.unshift(data)
          swal("Poof! Your Article has been submitted!", {
            icon: "success",
          });
          this.clearEditor()
        })
        .catch( ({response}) => {
          // console.log(response.data.message.split('Article validation failed: ')[1].split(', '))
          let warning = response.data.message.split('Article validation failed: ')[1].split(', ').join('\n')
          swal(warning, {
            buttons: false,
            timer: 2000,
          });
        })     
    },
    submitUpdate() {
      axios({
        method: 'put',
        url: serverUrl+ `/articles/${this.update._id}`,
        data : {
          title : this.title,
          content : this.text
        }
      })
        .then( ({data}) => {
          // console.log(data)
          this.update.title = this.title
          this.update.content = this.text
          // console.log(JSON.stringify(response))
          // let index = this.articles.findIndex(article => article._id == this.update)
          // this.articles.splice(index, 1 ,data)
          this.clearEditor()
        })
        .catch( err => {
          console.log(response.data.message)
        })
    },
    deleteArticle(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this article!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            method: 'delete',
            url: serverUrl + `/articles/${id}`
          })
            .then( response => {
              let index = this.articles.findIndex(article => {
                return article.id == id
              })
              this.articles.splice(index, 1)
              swal("Poof! Your Article has been deleted!", {
                icon: "success",
              });
            })
            .catch( err => {
              console.log(JSON.stringify(err))
            })
        }
      });
    }
  }
})