<script>
    import {Stepper, Step, ListBox, ListBoxItem} from '@skeletonlabs/skeleton';
    import { AppBar } from '@skeletonlabs/skeleton';
    import {createEventDispatcher} from 'svelte';
    import Question from '../lib/Question.js'
    import {totalScore, currentScore} from "$lib/store.js";
    import Searchbar from "./Searchbar.svelte";

    export let question;
    let valuSingle;
    let valuMultiple;
    let lastvalueSingle;
    let lastvalueMultiple;
    let score;
    let lockedState = true;

    totalScore.subscribe(value => {
        score = value;
    });
    let valueMultiple = [];
    function selectOptionSingle(valuSingle) {
        if (!lockedState)
        {
            currentScore.set(question.get_score(lastvalueSingle,lastvalueMultiple));
        }
        lockedState = false;
        question.answer(valuSingle,totalScore); // 处理答案
        lastvalueSingle = valuSingle;
    }
    function selectOptionMultiple(valuMultiple, option) {
        lockedState = false;
        if (!(valuMultiple.includes(option)))
        {
            valuMultiple = [...valuMultiple, option];
        }
        else
        {
            valuMultiple = valuMultiple.filter(item => item !== option);
        }

        question.answer(valuMultiple,totalScore ); // 处理答案
        lastvalueMultiple = valuMultiple;
    }



    // 订阅得分store


</script>


<Step locked={lockedState} >
    <div class="card p-4">
    <AppBar>{question.content}</AppBar>

    {#if !question.isMultiply}
        <ListBox } >
            {#each Object.keys(question.options) as option}
                <ListBoxItem bind:group={valuSingle} name = "medium" value={option} on:click={() => selectOptionSingle(option)}>{option}</ListBoxItem>
            {/each}
        </ListBox>

    {:else}
        <ListBox multiple>
            {#each Object.keys(question.options) as option}
            <ListBoxItem bind:group={valueMultiple} name = "medium" value={option} on:click={() => selectOptionMultiple(valueMultiple,option)}>{option}</ListBoxItem>
            {/each}
        </ListBox>
    {/if}
        {#if question.faq}
            <Searchbar items={question.faqcontent} title={question.faqtitle} />
        {/if}
</Step>


