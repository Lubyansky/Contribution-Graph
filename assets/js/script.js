import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

new Vue({
    el: '#contribution-graph',
    data(){
        return{
            contributionTypes: [
                {
                  description: "No contributions",
                  color: "#ededed",
                },
                {
                  description: "1-9 contributions",
                  color: "#acd5f2",
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
            currentDate: Date.now(),
            isLoading: true,
            selectedCell: -1
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

            month = (month == 0) ? '12' : month
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
                this.cells.data[this.formateDate(dateValue)] = {contributionCount: 0, color: '#000000'}
            }
        },


        async fillCells(){
            let contributionList = JSON.parse(JSON.stringify(this.contributionList.data))
            const resultDictionary = {}
            
            for (var date in this.cells.data) {
                if(contributionList[date]){
                    resultDictionary[date] = {contributionCount: contributionList[date], color: '#000000'}
                }
                else {
                    resultDictionary[date] = {contributionCount: 0}
                }

                if(resultDictionary[date].contributionCount == 0){
                    resultDictionary[date].color = this.contributionTypes[0].color
                }
                if(resultDictionary[date].contributionCount >= 1 && resultDictionary[date].contributionCount <= 9){
                    resultDictionary[date].color = this.contributionTypes[1].color
                }
                if(resultDictionary[date].contributionCount >= 10 && resultDictionary[date].contributionCount <= 19){
                    resultDictionary[date].color = this.contributionTypes[2].color
                }
                if(resultDictionary[date].contributionCount >= 20 && resultDictionary[date].contributionCount <= 29){
                    resultDictionary[date].color = this.contributionTypes[3].color
                }
                if(resultDictionary[date].contributionCount >= 30){
                    resultDictionary[date].color = this.contributionTypes[4].color
                }
            }

            this.cells.data = resultDictionary
            console.log(this.cells.data)
        },

        selectCell(index){
            this.selectedCell = index
        }
    },


    created(){
        this.createCells();
    },


    async mounted() {
        await this.loadContributionData();

        await this.fillCells()
        this.isLoading = false
    } 

})

Vue.component('contribution-cell',{
    props:['cell', 'index', 'selected-cell'],
    emits: ['select-cell'],
    template: '#contribution-cell',
    data(){
        return{
            isPressed: false
        }
    },
    methods: {
        getContributionsCount(){
            if(this.cell.description){
                return this.cell.description
            }
            return (this.cell.contributionCount > 0 ? this.cell.contributionCount : `No`)  + ` contributions`;
        },
        /*Click(){
            if(this.isPressed){
                this.isPressed = false
            }
            else {
                this.isPressed = true
            }

            this.$emit('selectCell', this.index)

            if(this.selectedCell != this.index){
                this.isPressed = false
            }
        }*/
    }
});
