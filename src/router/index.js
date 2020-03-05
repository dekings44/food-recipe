import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import AddFoodRecipes from "../components/AddFoodRecipes.vue";
import EditFoodRecipes from "../components/EditFoodRecipes.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/addfoodrecipes",
		name: "AddFoodRecipes",
		component: AddFoodRecipes
	},
	{
		path: "/editfoodrecipes/:foodrecipe_slug",
		name: "EditFoodRecipes",
		component: EditFoodRecipes
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
