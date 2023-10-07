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
            cells: {
                size: 357,
                data: new Object()
            },
            currentDate: Date.now()
        }
    },

    methods: {

        async loadContributionData(){
            let response = await fetch(this.contributionList.url);

            if (response.ok) {
                this.contributionList.data = await response.json();
            } 
            else {
                console.log("Ошибка HTTP: " + response.status);
            }
        },


        formateDate(date){
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();

            //month = (month == 0) ? '12' : month
            month = (month < 10) ? '0' + month : month;
            day = (day < 10) ? '0' + day : day;
            
            return year + "-" + month + "-" + day
        },


        createCells(){
            const dayMilliseconds = 24*60*60*1000;
            let arr = Array(this.cells.size).fill(1).map((index, start) => index + start - 1)
            arr = arr.reverse()

            for(var value in arr){
                let dateValue = new Date(this.currentDate - dayMilliseconds * value)
                this.cells.data[this.formateDate(dateValue)] = {contributionCount: 0}
            }
        }

    },


    created(){
        this.createCells();
    },


    async mounted() {
        await this.loadContributionData();
    } 

})
