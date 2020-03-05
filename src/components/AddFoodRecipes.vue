<template>
	<div class="add-foodrecipes container">
		<h2 class="center-align red-text darken-2">Add New Food Recipes</h2>
		<form @submit.prevent="AddFoodRecipes">
			<div class="field title">
				<label for="title">Food Recipes Title</label>
				<input type="text" name="title" v-model="title" />
			</div>
			<div v-for="(res, index) in recipes" :key="index" class="field">
				<label for="recipe">Recipe:</label>
				<input type="text" name="recipe" v-model="recipes[index]" />
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
				<button class="btn blue">Add Recipes</button>
			</div>
		</form>
	</div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
	name: "AddFoodRecipes",
	data() {
		return {
			title: null,
			another: null,
			recipes: [],
			feedback: null,
			slug: null
		};
	},
	methods: {
		AddFoodRecipes() {
			if (this.title) {
				this.feedback = null;
				// create a slug
				this.slug = slugify(this.title, {
					replacement: "-",
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				});
				db.collection("foodrecipes")
					.add({
						title: this.title,
						recipes: this.recipes,
						slug: this.slug
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
				this.recipes.push(this.another);
				this.another = null;
				this.feedback = null;
			} else {
				this.feedback = "You need to enter a value to add a recipe";
			}
		},
		deleteRes(res) {
			this.recipes = this.recipes.filter(recipe => {
				return recipe != res;
			});
		}
	}
};
</script>

<style>
.add-foodrecipes {
	margin-top: 40px;
	padding: 20px;
	max-width: 500px;
}
.add-foodrecipes h2 {
	font-size: 2em;
	margin: 20px auto;
}
.add-foodrecipes .field {
	margin: 0px auto;
	position: relative;
}
.add-foodrecipes .delete {
	position: absolute;
	right: 0;
	bottom: 16px;
	color: #aaa;
	font-size: 1.4em;
	cursor: pointer;
}
</style>
