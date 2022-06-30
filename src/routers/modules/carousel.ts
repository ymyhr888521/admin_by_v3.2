import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// carousel1 模块
const carouselRouter: Array<RouteRecordRaw> = [
	{
		path: "/proCarousel",
		component: Layout,
		redirect: "/proCarousel/carousel111",
		meta: {
			title: "proCarousel"
		},
		children: [
			{
				path: "/proCarousel/carousel111",
				name: "carousel111",
				component: () => import("@/views/carousel/carousel111/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "carousel111",
					key: "carousel111"
				}
			},
			{
				path: "/proCarousel/carousel222",
				name: "carousel222",
				component: () => import("@/views/carousel/carousel222/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "carousel222",
					key: "carousel222"
				}
			}
		]
	}
];

export default carouselRouter;
