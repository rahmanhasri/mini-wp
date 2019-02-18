Vue.component('view-component', {

  props : ['view-article'],

  methods : {
    getAgo() {
      let today = new Date();
      let createdOn = new Date(this.viewArticle.created_at);
      let msInDay = 24 * 60 * 60 * 1000;

      createdOn.setHours(0,0,0,0);
      today.setHours(0,0,0,0)

      return (+today - +createdOn)/msInDay + ' days ago'
    }
  },
  template : `
  <div class="card text-center w-100">
    <div>
      <img class="card-img-top" :src="viewArticle.image" alt="Card image cap">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ viewArticle.title }}</h5>
      <footer v-if=""></footer>
      <p class="card-text" v-html="viewArticle.content"></p>
    </div>
    <div class="card-footer text-muted">
      {{ getAgo() }}
    </div>
    <div class="card-footer text-muted">
      <a href="#" @click.prevent="$emit('scroll-up')">Scroll up</a>
    </div>
  </div>
  `
})