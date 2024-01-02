<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
    import {Stepper, Step, AppBar} from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    // import Question from "../components/QuestionUI.svelte"
    import { onMount } from 'svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Question  from "../../lib/Question.js"
    import QuestionUI from "../../components/QuestionUI.svelte";
    import {language, currentScore, totalScore} from "$lib/store.js";
    import { Button,Progress} from '@svelteuidev/core';
    let currentLanguage;

    language.subscribe(value => {
            currentLanguage = value;
    });
    let questions = []; // 用于存储问题的数组

    async function loadQuestions(lang) {
            try {
                    // 动态导入语言文件
                    const module = await import(`../../${lang}.json`); // 请根据实际文件位置修改路径
                    const questionsData = module.default; // 获取默认导出

                    // 将每个问题转换为Question对象
                    questions = questionsData.map(q => new Question(q.id, q.question, q.options, q.isMultiple, q.FAQ, q.FAQtitle, q.FAQContent));
            } catch (error) {
                    console.error('Error loading questions:', error);
            }
    }

    // 当组件加载时载入默认语言的问题
    loadQuestions(currentLanguage);

    let score = 0;
    let currentscore = 0;
    totalScore.subscribe(value => {
            score = value;
    });
    currentScore.subscribe(value => {
            currentscore = value;
    });


    // 用于切换语言并重新加载问题
    function changeLanguage(lang) {
            loadQuestions(lang);
            language.set(lang);
    }

    function onCompleteHandler()
    {
            if (currentLanguage === 'cn')
            {
                    if(score < 70) {

                                    alert("不通过")
                            }
                    else
                            {
                                    alert("通过")
                            }
            }
            if (currentLanguage === 'en')
            {
                    if(score < 70) {

                            alert("Not Pass")
                    }
                    else
                    {
                            alert("Pass")
                    }
            }
            if (currentLanguage === 'jp')
            {
                    if(score < 70) {

                            alert("残念")
                    }
                    else
                    {
                            alert("合格")
                    }
            }
    }
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    function onBack() {
            totalScore.set(0)
    }

    function onStepForward()
    {
            currentScore.set(0)
    }
</script>


<style>
        .score {

                border: 2px solid white;
                background: #fff;
                text-align: center;
                border-radius: 10px;
                margin: 0 auto;
        }
        .score p {
                font-size: 20px;
                font-weight: 700;
                color: #000;
                margin: 0;
        }

</style>
<Stepper on:complete={onCompleteHandler} on:back = {onStepForward} on:next={onStepForward}>
{#each questions as question}
        <QuestionUI {question} />
{/each}
</Stepper>


<a class="logo-item bg-initial"  href="/" rel="noreferrer" on:click={onBack}>
        <span>Back to Top</span>
</a>
{#if currentLanguage === 'cn'}
        <div class="score"><p> 当前得分:{score}<p></div>
{:else}
        <div class="score"><p> Score:{score}<p></div>
{/if}



