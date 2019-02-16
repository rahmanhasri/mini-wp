Vue.component('preview-component', {


  props : ['preview'],
  template : `
  <div>
    <h3>Preview</h3>
    <img class="img-thumbnail" :src="preview" alt="image preview" >
  </div>
  `
})