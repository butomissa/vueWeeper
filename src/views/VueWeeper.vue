<template>
    <div id="vueWeeper" @click="source()">

    </div>
</template>

<script>
export default {
    name: 'vueWeeper',
    methods: {
        source() {
            this.original = []
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
                this.original.push(line)
            }
            for (let j = 0; j < 10; j++) {
                let k = count < 10 ? 9 : 0
                if (k === 9) {
                    count++
                    line[j] = 1
                } else { line[j] = 0 }
            }
            this.original.push(line)
            // console.log(this.original)
            this.output()
            // console.log(count);
        },
        output() {
            this.final = []
            let line = new Array()
            for (let i = 0; i < 10; i++) {
                line = []
                for (let j = 0; j < 10; j++) {
                    let count = 0
                    if (this.original[i][j] === 1) { count = '◉' }
                    else {
                        if (i > 0) {
                            if (j > 0) { count += this.original[i - 1][j - 1] }
                            count += this.original[i - 1][j]
                            if (j < 9) { count += this.original[i - 1][j + 1] }
                        }
                        if (j > 0) { count += this.original[i][j - 1] }
                        count += this.original[i][j]
                        if (j < 9) { count += this.original[i][j + 1] }
                        if (i < 9) {
                            if (j > 0) { count += this.original[i + 1][j - 1] }
                            count += this.original[i + 1][j]
                            if (j < 9) { count += this.original[i + 1][j + 1] }
                        }
                    }
                    // console.log(this.original[i][j]);
                    line[j] = count
                }
                this.final.push(line)
            }
            console.log(this.original)
            console.log(this.final)
        },
    },
    data() {
        return {
            original: [],
            final: [],
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