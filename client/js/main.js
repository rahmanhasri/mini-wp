
const serverUrl = 'http://localhost:3000'

const app2 = new Vue({
  el: '#articles',
  created() {

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
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data : {
    articles : [],
    text: '',
    title: '',
    keyword: '',
    update : false,
    files : [],
    currentPage : 'menu',
    loading : false
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
    clearEditor() {
      this.title = ''
      this.text = ''
      this.update = false
      this.files = []
      this.preview = ''
    },
    updateArticle(article) {
      this.title = article.title
      this.text = article.content
      this.update = article
    },
    submit() {
      // console.log(JSON.stringify(this.text))
      let dataForm = new FormData()
      dataForm.append('title', this.title)
      dataForm.append('content', this.text)
      dataForm.append('image', this.files[0])
      if(!this.files.length) {
        swal('Please input featured image', {
          buttons: true,
          timer: 2000,
        });
      } else if(!(this.files[0].type.includes('jpeg') || this.files[0].type.includes('jpg') || this.files[0].type.includes('png'))) {
        swal({
          title: "Please input image file",
          button : "ok",
          timer: 2000
        })
      } else {
        this.loading = true
        axios({
          method: 'post',
          url: serverUrl + '/articles',
          data : dataForm,
          headers: { 'Content-Type': 'multipart/form-data' }        
        })
          .then( ({ data }) => {
            // console.log(data)
            this.articles.unshift(data)
            this.loading = false
            swal("Poof! Your Article has been submitted!", {
              icon: "success",
            });
            this.clearEditor()
          })
          .catch( ({response }) => {
            console.log(response)
            // console.log(response.data.message.split('Article validation failed: ')[1].split(', '))
            let warning = response.data.message.split('Article validation failed: ')[1].split(', ').join('\n')
            swal(warning, {
              buttons: true,
              timer: 2000,
            });
          })     
      }
    },
    submitUpdate() {
      let dataForm = new FormData()
      dataForm.append('title', this.title)
      dataForm.append('content', this.text)
      dataForm.append('image', this.files[0])
      axios({
        method: 'put',
        url: serverUrl+ `/articles/${this.update._id}`,
        data : dataForm,
        headers : { 'Content-Type' : 'multipart/form-data'}
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
                return article._id == id
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
    },
    previewFiles(e) {
      const file = e.target.files[0];
      this.files = this.$refs.myFiles.files
      this.preview = URL.createObjectURL(file)
      // console.log(file)
      // console.log(this.preview)
    },
    uploadImage() { // ga dipake
      
      if(!this.files.length) {
        let warning = `please choose file...`
        swal(warning, {
          buttons: false,
          timer: 2000,
        });
      } else {
        let dataForm = new FormData()
        dataForm.append('image', this.files[0])
        axios({
          method: 'post',
          url: serverUrl + '/upload',
          data : dataForm,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then( ({ data }) => {
            // console.log(response) 
            swal(data.message, data.link)
          })
          .catch( err => {
            console.log(err)
          })
      }
    }
  }
})