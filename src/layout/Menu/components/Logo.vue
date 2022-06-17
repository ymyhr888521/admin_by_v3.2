<template>
	<div class="logo flx-center">
		<img src="@/assets/images/avatar.jpg" alt="logo" style="border-radius: 50%" />
		<span v-show="!isCollapse">lpf_test_admin</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
