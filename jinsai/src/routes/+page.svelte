<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import {language} from "$lib/store.js";
	import {Stepper, Step, AppBar, Autocomplete} from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Langselect from "../components/Langselect.svelte";
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Question from "$lib/Question.js";

	function updateLanguage(newLang) {
		language.set(newLang);
		loadStart(currentLanguage);
	}



	let currentLanguage;
	language.subscribe(value => {
		currentLanguage = value;
	});
	let starts = [];
	let title;
	let urls = []
	async function loadStart(lang) {
			// 动态导入语言文件
			const module = await import(`../start_${lang}.json`);
			console.log(module);
			// 请根据实际文件位置修改路径
			starts = module.FAQ; // 获取默认导出
			urls = module.url;
			title = module.title;
	}
	$:loadStart(currentLanguage);

</script>

<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>


<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"> <Langselect></Langselect></svelte:fragment>
<strong>{@html title}</strong>
	<svelte:fragment slot="trail"> <LightSwitch></LightSwitch></svelte:fragment>
</AppBar>


<Accordion  class="card p-4 text-token">
	{#each starts as start}
		<AccordionItem >
			<svelte:fragment slot="summary"><strong>{@html start.question}<strong></svelte:fragment>
			<svelte:fragment slot="content" >{start.answer}</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>

<div class="logo-cloud grid-cols-1 lg:!grid-cols-2 gap-0.5 ">
	{#each urls as url}
		<a class="logo-item bg-initial" href={url.url} >
			<i class="fa-brands fa-twitch text-2xl" />
			<span>{url.name}</span>
		</a>

	{/each}
</div>




