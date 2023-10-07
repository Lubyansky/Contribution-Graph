import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

new Vue({
    el: '#ContributionGraph',
    data(){
        return{
            contributionTypes: [
                {
                  description: "No contributions",
                  color: "#ededed"
                },
                {
                  description: "1-9 contributions",
                  color: "#acd5f2"
                },
                {
                  description: "10-19 contributions",
                  color: "#7fa8c9"
                },
                {
                  description: "20-29 contributions",
                  color: "#527ba0"
                },
                {
                  description: "30+ contributions",
                  color: "#254e77"
                }
            ],
            contributionList: {
                url: 'https://dpg.gg/test/calendar.json',
                data: {}
            },
            //cells: []
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
