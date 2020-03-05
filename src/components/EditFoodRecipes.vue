<template>
	<div v-if="foodrecipe" class="edit-foodrecipes container">
		<h2>Edit {{ foodrecipe.title }} Recipe</h2>
		<form @submit.prevent="EditFoodRecipes">
			<div class="field title">
				<label for="title">Food Recipes Title</label>
				<input type="text" name="title" v-model="foodrecipe.title" />
			</div>
			<div
				v-for="(res, index) in foodrecipe.recipes"
				:key="index"
				class="field"
			>
				<label for="recipe">Recipe:</label>
				<input type="text" name="recipe" v-model="foodrecipe.recipes[index]" />
				<i class="material-icons delete" @click="deleteRes(res)">delete</i>
			</div>
			<div class="field add-recipe">
				<label for="add-foodrecipes">Add a recipe</label>
				<input
					type="text"
					name="add-recipe"
					@keydown.tab.prevent="addRes"
					v-model="another"
				/>
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn blue">Update Recipes</button>
			</div>
		</form>
	</div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
	name: "EditFoodRecipes",
	data() {
		return {
			foodrecipe: null,
			another: null,
			feedback: null
		};
	},
	methods: {
		EditFoodRecipes() {
			if (this.foodrecipe.title) {
				this.feedback = null;
				// create a slug
				this.foodrecipe.slug = slugify(this.foodrecipe.title, {
					replacement: "-",
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				});
				db.collection("foodrecipes")
					.doc(foodrecipe.id)
					.update({
						title: this.foodrecipe.title,
						recipes: this.foodrecipe.recipes,
						slug: this.foodrecipe.slug
					})
					.then(() => {
						this.$router.push({ name: "Home" });
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.feedback = "You must enter a recipe title";
			}
		},
		addRes() {
			if (this.another) {
				this.foodrecipe.recipes.push(this.another);
				this.another = null;
				this.feedback = null;
			} else {
				this.feedback = "You need to enter a value to add a recipe";
			}
		},
		deleteRes(res) {
			this.foodrecipe.recipes = this.foodrecipe.recipes.filter(recipe => {
				return recipe != res;
			});
		}
	},
	created() {
		let ref = db
			.collection("foodrecipes")
			.where("slug", "==", this.$route.params.foodrecipe_slug);
		ref.get().then(snapshot => {
			snapshot.forEach(doc => {
				this.foodrecipe = doc.data();
				this.foodrecipe.id = doc.id;
			});
		});
	}
};
</script>

<style>
.edit-foodrecipes {
	margin-top: 40px;
	padding: 20px;
	max-width: 500px;
}
.edit-foodrecipes h2 {
	font-size: 2em;
	margin: 20px auto;
}
.edit-foodrecipes .field {
	margin: 0px auto;
	position: relative;
}
.edit-foodrecipes .delete {
	position: absolute;
	right: 0;
	bottom: 16px;
	color: #aaa;
	font-size: 1.4em;
	cursor: pointer;
}
</style>
