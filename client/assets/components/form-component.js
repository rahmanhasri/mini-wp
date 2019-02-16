Vue.component('form-component', {
  
  props : ['update-article'],
  data() {
    return {
      title : this.updateArticle ? this.updateArticle.title : '',
      text : this.updateArticle ? this.updateArticle.content : '',
      files : [],
      loading : false
    }
  },

  watch : {
    // title() {
    //   this.title = this.updateArticle ? updateArticle.title : ''
    // },
    // text() {
    //   console.log(this.updateArticle)
    //   this.text = this.updateArticle ? updateArticle.content : ''
    // }
  },
  computed: {
    // titleFill: {
    //   get: function () {
    //     return this.updateArticle ? this.updateArticle.title : this.title
    //   },
    //   set: function (newValue) {
    //     this.updateArticle.title = newValue
    //   }
    // },
    // textFill:{
    //   get: function() {
    //     return this.updateArticle ? this.updateArticle.content : this.text
    //   },
    //   set: function(newValue) {
    //     this.updateArticle.content = newValue
    //   }
    // }
  },

  methods : {

    previewFiles(e) {
      const file = e.target.files[0]
      this.files = this.$refs.myFiles.files
      // this.preview = 
      this.$emit('preview', URL.createObjectURL(file))
    },

    submit() {
      this.$emit('preview', '')
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
      if(this.files[0]) {
        dataForm.append('image', this.files[0])
      }

      axios({
        method: 'post',
        url: serverUrl+ `/articles/${this.updateArticle._id}`,
        data : dataForm,
        headers : { 'Content-Type' : 'multipart/form-data'}
      })
      .then( ({data}) => {
      // console.log(data)
          // this.updateArticle.title = this.title
          // this.updateArticle.content = this.text
          // console.log(data)
          this.$emit('updateSuccess', data)
          // console.log(JSON.stringify(response))
          // let index = this.articles.findIndex(article => article._id == this.update-article)
          // this.articles.splice(index, 1 ,data)
          this.clearEditor()
        })
        .catch( ({ response }) => {
          console.log(response.data.message)
        })
    },

    clearEditor() {
      this.title = ''
      this.text = ''
      this.files = []
      this.preview = ''
    },
  },

  
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  template : `
  <div class="panel-group my-2">
        
    <div  style="height:800px;" class="mx-auto">
      <div v-if="loading === false">
        <form action="#" >
          <input type="text" class="form-control my-2" v-model="title" placeholder="Enter the title...">
          <div>
            <label for="image">Choose Featured Image</label>
          </div>
          <input class="btn btn-outline-dark my-1" type="file" name="image" id="imageUpload" ref="myFiles"
          @change="previewFiles">
          <br>
          <div> <wysiwyg v-model="text" /> </div>
          <a class="btn btn-outline-success my-3" @click.prevent="submitUpdate" v-if="updateArticle">Update</a>
          <a class="btn btn-outline-success my-3" @click.prevent="submit" data-target="#myModal" v-else>Submit</a>
        </form>
      </div>
      <div class="d-flex justify-content-center" v-else>
        <img class="item-" src="https://static-steelkiwi-dev.s3.amazonaws.com/media/filer_public/4e/07/4e07eece-7c84-46e2-944d-1a6b856d7b5f/463ff844-6f36-4ffe-b051-fea983d39223.gif">
      </div>
    </div>
  </div>
  
  `
})