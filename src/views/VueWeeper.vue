<template>
<div id="vueWeeper">
    <div id="status">{{ status }}</div>
    <div class="table" ref="table">
        <template v-for="(row, index) of final">
            <div class="cell" v-for="(col, num) of row" @mouseenter="cellEnter(index, num)"
            @click.left="cellClick(index, num)" @contextmenu.prevent="cellFlag(index, num)"
            :key="index + '_' + num" :ref="index"/>
        </template>
    </div>
    <div id="restart" @click="restart()">Restart</div>
</div>
</template>

<script>
export default {
    name: 'vueWeeper',
    mounted() {
        // 屏蔽右键菜单
        // document.oncontextmenu = function(){ return false }
        this.source()
    },
    methods: {
        source() {
            let table = new Array()
            let line = new Array()
            this.final = []
            this.opened = []
            this.flag = []
            // 初始化 原始雷表 计算后的雷表 判断cell是否已点击的表 插旗的表
            for (let j = 0; j < this.col; j++) { line.push(0) }
            for (let i = 0; i < this.row; i++) {
                table.push(line.slice(0))
                this.final.push(line.slice(0))
                this.opened.push(line.slice(0))
                this.flag.push(line.slice(0))
            }
            // 随机布雷
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
            // 计算最终雷表
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
            // console.log(this.final)
        },
        restart() {
            // 重置cell样式
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    this.$refs[i][j].style.background = "linear-gradient(150deg, hsla(0, 0%, 97%, 1), hsla(0, 0%, 90%, 1))"
                    this.$refs[i][j].innerText = ""
                }
            }
            this.source()
        },
        cellEnter(index, num) {
            if (this.opened[index][num] === 1) {
                this.$refs[index][num].style.cursor = "default"
            } else {
                this.$refs[index][num].style.cursor = "pointer"
            }
        },
        cellFlag(index, num) {
            // 插旗
            if (this.opened[index][num] === 0) {
                if (this.flag[index][num] === 0) {
                    this.flag[index][num] = 1
                    this.$refs[index][num].style.background = "hsla(120, 100%, 44%, 1)"
                } else {
                    this.flag[index][num] = 0
                    this.$refs[index][num].style.background = "linear-gradient(150deg, hsla(0, 0%, 97%, 1), hsla(0, 0%, 90%, 1))"
                }
            }
        },
        cellClick(index, num) {
            // 判断cell是否已点击或插旗
            if (this.opened[index][num] === 0 && this.flag[index][num] === 0 ) {
                let count = this.final[index][num]
                // console.log(index, num)
                this.opened[index][num] = 1
                if (count === 9) {
                    // cell为雷
                    this.$refs[index][num].style.background = "hsla(0, 100%, 84%, 1)"
                    // 点开所有的雷
                    for (let i = 0; i < this.row; i++) {
                        for (let j = 0; j < this.col; j++) {
                            if (this.final[i][j] === 9) { this.cellClick(i, j) }
                        }
                    }
                } else if (count === 0) {
                    // cell为空
                    this.$refs[index][num].style.background = "hsla(0, 0%, 97%, 1)"
                    // 递归周围的cell
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
                    // cell为数字
                    this.$refs[index][num].style.background = "hsla(0, 0%, 97%, 1)"
                    this.$refs[index][num].innerText = count
                }
            }
        },
    },
    data() {
        return {
            final: [],
            opened: [],
            flag: [],
            col: 10,
            row: 10,
            mines: 10,
            status: "begin"
        }
    }
}
</script>

<style scoped>
#vueWeeper {
    height: 100vh;
    width: 100vw;
}
#status {
    margin: 40px auto;
    text-align: center;
    font-size: 60px;
    font-weight: 100;
    letter-spacing: 8px;
    color: hsla(0, 0%, 57%, 1);
}
.table {
    margin: 40px auto;
    display: flex;
    flex-wrap: wrap;
}
.cell {
    display: flex;
    height: 30px;
    width: 30px;
    font-size: 16px;
    line-height: 30px;
    font-weight: 800;
    place-content: center;
    border: 1px solid hsla(0, 0%, 95%, 1);
    background: linear-gradient(150deg, hsla(0, 0%, 97%, 1), hsla(0, 0%, 90%, 1));
    /* cursor: pointer; */
    transition: all ease, 0.3s;
}
#restart {
    margin: 40px auto 0 auto;
    width: 200px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
    color: hsla(0, 0%, 100%, 1);
    background: hsla(280, 97%, 30%, 1);
    cursor: pointer;
}
</style>