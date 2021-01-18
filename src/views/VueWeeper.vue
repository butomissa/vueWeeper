<template>
    <div id="vueWeeper" @click="test()">

    </div>
</template>

<script>
export default {
    name: 'vueWeeper',
    methods: {
        test() {
            this.table = []
            let count = 0
            let line = new Array()
            for (let i = 0; i < 9; i++) {
                line = []
                for (let j = 0; j < 10; j++) {
                    let k = count < 10 ? Math.floor(Math.random() * 10) : 0
                    if (k === 9) {
                        count++
                        line[j] = 1
                    } else { line[j] = 0 }
                }
                this.table.push(line)
            }
            for (let j = 0; j < 10; j++) {
                let k = count < 10 ? 9 : 0
                if (k === 9) {
                    count++
                    line[j] = 1
                } else { line[j] = 0 }
            }
            console.log(this.table)
            console.log(count);
        },
    },
    data() {
        return {
            table: [],
        }
    }
}
</script>

<style scoped>
#vueWeeper {
    height: 100vh;
    width: 100vw;
}
</style>