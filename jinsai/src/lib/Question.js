import { Stepper, Step } from '@skeletonlabs/skeleton';
import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
import {currentScore} from "$lib/store.js";

let score = 0;
currentScore.subscribe(value => {score = value});
export default class Question {
    constructor(id,  content, options,isMultiply,faq,faqtitle,faqcontent) {
        this.id = id;
        this.content = content;
        this.options = options;
        this.isMultiply = isMultiply;
        this.faq = faq;
        this.faqtitle = faqtitle
        this.faqcontent = faqcontent
    }
    get_score(valuesingle, valuemultiply) {
        let optionScore = 0;
        if(!this.isMultiply) {
             optionScore = this.options[valuesingle];
        }
        else {
            let option = valuemultiply;
            let optionScore= 0
            for (let i = 0; i < option.length; i++) {
                optionScore += this.options[option[i]];
            }
        }
        console.log(1111)
        console.log(optionScore)
        return optionScore;
    }
    answer(option,totalScore)
    {
        if(!this.isMultiply) {

            let optionScore = this.options[option];
            totalScore.update(total => total  + optionScore - score);
            currentScore.set(optionScore);
        }
        else {
            let optionScore= 0
            console.log(option)
            for (let i = 0; i < option.length; i++) {
                console.log(option[i])
                optionScore += this.options[option[i]];
            }
            console.log(optionScore)
            console.log(score)
            totalScore.update(total =>  total + optionScore - score);
            currentScore.set(optionScore);
        }

    }

}
