<template>
	<div class="home container">
		<div class="card" v-for="foodrecipe in foodrecipes" :key="foodrecipe.id">
			<div class="card-content">
				<i
					class="material-icons delete"
					@click="deleteFoodrecipe(foodrecipe.id)"
					>delete</i
				>
				<h2 class="red-text darken-2">{{ foodrecipe.title }}</h2>
				<ul class="recipes">
					<li v-for="(recipe, index) in foodrecipe.recipes" :key="index">
						<span class="chip white-text">{{ recipe }}</span>
					</li>
				</ul>
			</div>
			<span class="btn-floating btn-large halfway-fab blue">
				<router-link
					:to="{
						name: 'EditFoodRecipes',
						params: { foodrecipe_slug: foodrecipe.slug }
					}"
				>
					<i class="material-icons edit">edit</i>
				</router-link>
			</span>
		</div>
	</div>
</template>

<script>
import db from "@/firebase/init";

export default {
	name: "Home",
	data() {
		return {
			foodrecipes: []
		};
	},
	methods: {
		deleteFoodrecipe(id) {
			// delete doc from firestore
			db.collection("foodrecipes")
				.doc(id)
				.delete()
				.then(() => {
					this.foodrecipes = this.foodrecipes.filter(foodrecipe => {
						return foodrecipe.id != id;
					});
				});
		}
	},
	created() {
		//fetch data from the firestore
		db.collection("foodrecipes")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					let foodrecipe = doc.data();
					foodrecipe.id = doc.id;
					this.foodrecipes.push(foodrecipe);
				});
			});
	}
};
</script>

<style>
.home {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 30px;
	margin-top: 60;
}
.home h2 {
	font-size: 1.8em;
	text-align: center;
	margin-top: 0;
}
.home .recipes {
	margin: 20px auto;
}
.home .recipes li {
	display: inline-block;
}

.chip {
	border-radius: 5px;
	background-color: #d50000;
}

.home .delete {
	position: absolute;
	top: 4px;
	right: 4px;
	cursor: pointer;
	font-size: 1.8em;
	color: #757575;
}
</style>
