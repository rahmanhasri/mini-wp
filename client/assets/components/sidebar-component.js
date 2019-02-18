Vue.component('sidebar-component', {
  

  data() {
    return {
      keyword : ''
    }
  },
  methods : {
    filter() {
      this.$emit('filter', this.keyword)
      this.keyword = ''
    },
    toArticle() {
      this.$emit('page', 'article')
    },
    toEditor() {
      this.$emit('page', 'editor')
    },
    toUserArticle() {
      this.$emit('page', 'my-article')
    },
    toTrash() {
      this.$emit('page', 'trash')
    }
  },
  template : `
  <div class="col-2">
    <nav class="nav flex-column border-right">
        <form action="#" @submit.prevent="filter()" class="my-3 mx-2">
          <input type="Search" id="input-id" class="form-control ds-input" placeholder="Search Articles" v-model="keyword" >
        </form>
        <a class="nav-link" @click.prevent="toArticle" href="#">Articles</a>
        <a class="nav-link" @click.prevent="toUserArticle" href="#">My Articles</a>
        <a class="nav-link" @click.prevent="toEditor" href="#">New Articles</a>
        <a class="nav-link" @click.prevent="toTrash" href="#">Trash</a>
    </nav>
  </div>
  `
})