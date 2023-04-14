<template>
  <body class="bg-col">
  <NavigationComponent></NavigationComponent>
  <RecipeComponent :post="dataPost" v-if="recipe" @boolean-sent="handleRecipeBoolean"
                   @post-updated="updatePostRecipe"></RecipeComponent>
  <MaltIngredientsComponent :post="dataPost" v-if="maltIngredients" @boolean-sent="handleBooleanMalt"
                            @post-updated="updatePostMaltIngredients"></MaltIngredientsComponent>
  <MaltComponent :post="dataPost" v-if="malt" @boolean-sent="handleBooleanMashIngredients"
                 @post-updated="updatePostMalt"></MaltComponent>
  <MashIngredientsComponent :post="dataPost" v-if="mashIngrediets" @boolean-sent="handleBooleanMash"
                            @post-updated="updatePostMashIngredients"></MashIngredientsComponent>
  <MashComponent :post="dataPost" v-if="mash" @boolean-sent="handleBooleanFermentationIngredients"
                 @post-updated="updatePostMash"></MashComponent>
  <FermentationIngredientsComponent :post="dataPost" v-if="fermentationIngredients"
                                    @boolean-sent="handleBooleanFermentation"
                                    @post-updated="updatePostFermentationIngredients"></FermentationIngredientsComponent>
  <FermentationComponent :post="dataPost" v-if="fermentation" @boolean-sent="handleSave"></FermentationComponent>
  <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";
import FooterComponent from "@/components/FooterComponent";
import RecipeComponent from "@/components/RecipeComponent";
import MaltComponent from "@/components/MaltComponent";
import MashComponent from "@/components/MashComponent";
import FermentationComponent from "@/components/FermentationComponent";
import MaltIngredientsComponent from "@/components/MaltIngredientsComponent";
import MashIngredientsComponent from "@/components/MashIngredientsComponent";
import FermentationIngredientsComponent from "@/components/FermentationIngredientsComponent";

export default {
  name: "AddRecipeView",
  components: {
    FermentationIngredientsComponent,
    MashIngredientsComponent,
    MaltIngredientsComponent,
    FermentationComponent,
    MashComponent, RecipeComponent, FooterComponent, NavigationComponent, MaltComponent
  },
  methods: {
    handleRecipeBoolean(value) {
      this.recipe = false;
      this.maltIngredients = value;
    },
    handleBooleanMalt(value) {
      this.maltIngredients = false;
      this.malt = value;
    },
    handleBooleanMashIngredients(value) {
      this.malt = false;
      this.mashIngrediets = value;
    },
    handleBooleanMash(value) {
      this.mashIngrediets = false;
      this.mash = value;
    },
    handleBooleanFermentationIngredients(value) {
      this.mash = false;
      this.fermentationIngredients = value;
    },
    handleBooleanFermentation(value) {
      this.fermentationIngredients = false;
      this.fermentation = value;
    },
    updatePostRecipe(post) {
      console.log(post)
      this.post.name = post.name;
      this.post.tag = post.tag;
      this.post.beer_type = post.beer_type;
      this.post.degrees = post.degrees;
      this.post.style = post.style;
      this.post.shared = post.shared;
      this.post.date = post.date;
      this.post.ibu = post.ibu;
      this.post.color = post.color;
      this.post.alcohol = post.alcohol;
      this.post.decoction = post.decoction;
      this.post.infusion = post.infusion;
      this.post.info = post.info;
      this.post.note = post.note;
      this.post.mladina = post.mladina;
    },
    updatePostMaltIngredients(post) {
      this.post.start_water = post.start_water;
      this.post.splash_water = post.splash_water;
      this.post.mash_type = post.mash_type;
    },
    updatePostMalt(post) {
      this.post.malt = post.malt;
    },
    updatePostMashIngredients(post) {
      this.post.hops_type = post.hops_type;
    },
    updatePostMash(post) {
      this.post.mash = post.mash;
    },
    updatePostFermentationIngredients(post) {
      this.post.fermentation_type = post.fermentation_type;
    },
    handleSave(post) {
      this.post.fermentation = post.fermentation;
      this.post.user_id = localStorage.getItem('userId');
      const oauth2Token = localStorage.getItem('authToken');
      const data = {
        name: this.post.name,
        tag: this.post.tag,
        beer_type: this.post.beer_type,
        degrees: this.post.degrees,
        style: this.post.style,
        shared: this.post.shared,
        date: this.post.date,
        ibu: this.post.ibu,
        color: this.post.color,
        alcohol: this.post.alcohol,
        decoction: this.post.decoction,
        infusion: this.post.infusion,
        info: this.post.info,
        note: this.post.note,
        mladina: this.post.mladina,
        user_id: this.post.user_id,
        malt: this.post.malt,
        mash: this.post.mash,
        fermentation: this.post.fermentation,
        start_water: this.post.start_water,
        splash_water: this.post.splash_water,
        mash_type: this.post.mash_type,
        hops_type: this.post.hops_type,
        fermentation_type: this.post.fermentation_type,
      }

      this.$http.post('/recipe/add', data, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            this.$router.push('/recepty/');
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  data() {
    return {
      formData: new FormData(),
      recipe: true,
      malt: false,
      mash: false,
      fermentation: false,
      maltIngredients: false,
      mashIngrediets: false,
      fermentationIngredients: false,
      post: {
        name: '',
        tag: '',
        beer_type: '',
        degrees: '',
        style: '',
        mladina: '',
        shared: false,
        date: '',
        ibu: '',
        color: '',
        alcohol: '',
        decoction: false,
        infusion: false,
        info: '',
        note: '',
        user_id: 0,
        malt: [],
        mash: [],
        fermentation: [],
        start_water: '',
        splash_water: '',
        mash_type: [],
        hops_type: [],
        fermentation_type: [],
      },
      dataPost: {
        name: '',
        tag: '',
        beer_type: '',
        degrees: '',
        style: '',
        shared: false,
        date: '',
        ibu: '',
        color: '',
        alcohol: '',
        decoction: false,
        infusion: false,
        info: '',
        note: '',
        user_id: 1,
        start_water: '',
        splash_water: '',
        mash_type: [],
        hops_type: [],
        fermentation_type: [],
        malt: [],
        mash: [],
        fermentation: [],
        mladina: '',
      }
    }
  }
}
</script>

<style scoped>
.bg-col {
  background: linear-gradient(180deg, #D0CECE 0%, #FFFFFF 52.64%);
  mix-blend-mode: normal;
}

.box {
  box-shadow: 0px 2.85768px 2.85768px rgba(0, 0, 0, 0.25);
  border-radius: 5.71536px;
}
</style>