<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    props: {
        probType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        time: {
            type: Number,
            default: 1000
        },
        offsetX: {
            type: Boolean,
            default: false
        },
         offsetY: {
            type: Boolean,
            default: false
        }
        },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probType: this.probType,
                click: this.click
            })
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // apply将参数传入scrollTo中
            this.scroll && this.scroll.scrollTo.apply(this.scroll, {
                time: this.time,
                offsetX: this.offsetX,
                offsetY: this.offsetY
            })
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, {
                time: this.time,
                offsetX: this.offsetX,
                offsetY: this.offsetY
            })
        }
    },
    watch: {
        // 当data变化，重新计算scroll，刷新scroll
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>
