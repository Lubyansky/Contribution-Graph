import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

new Vue({
    el: '#ContributionGraph',
    data(){
        return{
            contributionList: {
              url: 'https://dpg.gg/test/calendar.json',
              data: {}
            }
        }
    },
    async mounted() {
        let response = await fetch(this.contributionList.url);

        if (response.ok) {
            this.contributionList.data = await response.json();
        } 
        else {
            console.log("Ошибка HTTP: " + response.status);
        }
    } 

})
