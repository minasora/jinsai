
<script>
    import { NativeSelect, Text } from '@svelteuidev/core';
    import {language} from "$lib/store.js"
    let languages = ['cn', 'jp', 'en'];
    let value = "cn";
    language.subscribe(v => {
        value = v;
    });
    $: language.set(value);


</script>


<NativeSelect
        data={languages}
        bind:value
/>