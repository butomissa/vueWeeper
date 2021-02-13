<template>
<div id="vueWeeper">
    <div class="table" ref="table">
        <template v-for="(row, index) of final">
            <div class="cell" v-for="(col, num) of row" @click="cellClick(index, num)"
            :key="index + '_' + num" :ref="index + '_' + num"/>
        </template><div id="restart" @click="restart()">Restart</div>
    </div>

</div>
</template>

<script>
export default {
    name: 'vueWeeper',
    mounted() {
        this.source()
    },
    methods: {
        source() {
            let table = new Array()
            let line = new Array()
            this.final = []
            this.opened = []
            for (let j = 0; j < this.col; j++) { line.push(0) }
            for (let i = 0; i < this.row; i++) {
                table.push(line.slice(0))
                this.final.push(line.slice(0))
                this.opened.push(line.slice(0))
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
            // console.log(table)
            this.$refs.table.style.width = this.row * 30 + "px"
            this.$refs.table.style.height = this.col * 30 + "px"
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    if (table[i][j] === 1) { this.final[i][j] = 9 }
                    else {
                        if (i > 0) {
                            if (j > 0) { this.final[i][j] += table[i - 1][j - 1] }
                            this.final[i][j] += table[i - 1][j]
                            if (j < this.col - 1) { this.final[i][j] += table[i - 1][j + 1] }
                        }
                        if (j > 0) { this.final[i][j] += table[i][j - 1] }
                        if (j < this.col - 1) { this.final[i][j] += table[i][j + 1] }
                        if (i < this.row - 1) {
                            if (j > 0) { this.final[i][j] += table[i + 1][j - 1] }
                            this.final[i][j] += table[i + 1][j]
                            if (j < this.col - 1) { this.final[i][j] += table[i + 1][j + 1] }
                        }
                    }
                }
            }
            console.log(this.final)
        },
        restart() {
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    this.$refs[i + "_" + j][0].style.background = "linear-gradient(150deg, hsla(0, 0%, 97%, 1), hsla(0, 0%, 90%, 1))"
                    this.$refs[i + "_" + j][0].innerText = ""
                }
            }
            this.source()
        },
        cellClick(index, num) {
            if (this.opened[index][num] === 0) {
                let count = this.final[index][num]
                let ref = index + "_" + num
                console.log(index, num);
                this.opened[index][num] = 1
                if (count === 9) {
                    this.$refs[ref][0].style.background = "hsla(0, 100%, 95%, 1)"
                } else if (count === 0) {
                    this.$refs[ref][0].style.background = "hsla(0, 0%, 95%, 1)"
                    if (index > 0) {
                        if (num > 0) { this.cellClick(index - 1, num - 1) }
                        this.cellClick(index - 1, num)
                        if (num < this.col - 1) { this.cellClick(index - 1, num + 1) }
                    }
                    if (num > 0) { this.cellClick(index, num - 1) }
                    if (num < this.col - 1) { this.cellClick(index, num + 1) }
                    if (index < this.row - 1) {
                        if (num > 0) { this.cellClick(index + 1, num - 1) }
                        this.cellClick(index + 1, num)
                        if (num < this.col - 1) { this.cellClick(index + 1, num + 1) }
                    }
                } else {
                    this.$refs[ref][0].style.background = "hsla(0, 0%, 95%, 1)"
                    this.$refs[ref][0].innerText = count
                }
            }
        },
    },
    data() {
        return {
            final: [],
            opened: [],
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
.table {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.cell {
    display: flex;
    height: 30px;
    width: 30px;
    font-size: 16px;
    line-height: 30px;
    font-weight: 800;
    place-content: center;
    background: linear-gradient(150deg, hsla(0, 0%, 97%, 1), hsla(0, 0%, 90%, 1));
}
#restart {
    margin: 30px auto 0 auto;
    width: 200px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
    color: hsla(0, 0%, 100%, 1);
    background: hsla(280, 97%, 30%, 1);

}
</style>