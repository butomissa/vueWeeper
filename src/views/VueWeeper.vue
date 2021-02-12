<template>
    <div id="vueWeeper" @click="source()">

    </div>
</template>

<script>
export default {
    name: 'vueWeeper',
    methods: {
        source() {
            let table = new Array()
            let final = new Array()
            let line0 = new Array()
            let line1 = new Array()
            for (let i = 0; i < this.row; i++) {
                line0 = []
                line1 = []
                for (let j = 0; j < this.col; j++) {
                    line0.push(0)
                    line1.push(0)
                }
                table.push(line0)
                final.push(line1)
            }
            let m = 0
            do {
                let i = Math.floor(Math.random() * this.row)
                let j = Math.floor(Math.random() * this.col)
                if (table[i][j] === 0) {
                    table[i][j] = 1
                    m++
                }
            } while (m < this.mines)
            console.log(table)
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    if (table[i][j] === 1) { final[i][j] = 9 }
                    else {
                        if (i > 0) {
                            if (j > 0) { final[i][j] += table[i - 1][j - 1] }
                            final[i][j] += table[i - 1][j]
                            if (j < this.col - 1) { final[i][j] += table[i - 1][j + 1] }
                        }
                        if (j > 0) { final[i][j] += table[i][j - 1] }
                        final[i][j] += table[i][j]
                        if (j < this.col - 1) { final[i][j] += table[i][j + 1] }
                        if (i < this.row - 1) {
                            if (j > 0) { final[i][j] += table[i + 1][j - 1] }
                            final[i][j] += table[i + 1][j]
                            if (j < this.col - 1) { final[i][j] += table[i + 1][j + 1] }
                        }
                    }
                }
            }
            console.log(final)
        },
    },
    data() {
        return {
            col: 10,
            row: 10,
            mines: 10,
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