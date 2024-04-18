<template>
    <el-input
        v-model="currentSelectRef"
        readonly
        :placeholder="t('all.icon.placeholder')"
        ref="buttonRef"
        v-popover="popoverRef"
    >
        <template #prepend>{{ prefix }}</template>
        <template #append>
            <el-button>
                <span v-if="currentSelectRef" :class="`${prefix}${currentSelectRef}`"></span>
                <span v-else class="i-gg:menu-grid-r"></span>
            </el-button>
            <el-popover ref="popoverRef" virtual-triggering :width="280" trigger="click" placement="bottom">
                <template #reference>
                    <el-button>
                        <span v-if="currentSelectRef" :class="`${prefix}${currentSelectRef}`"></span>
                        <span v-else class="i-gg:menu-grid-r"></span>
                    </el-button>
                </template>
                <div class="flex flex-row px-1 mb-2">
                    <ElInput
                        :placeholder="$t('all.icon.searchPlaceholder')"
                        clearable
                        v-model="searchRef"
                        class="flex-1"
                    />
                    <el-button text type="info" class="ml-1" @click="handleClear">清空</el-button>
                </div>
                <el-scrollbar height="180px">
                    <ul
                        v-if="getIconsRef.length > 0"
                        class="flex flex-wrap flex-row list-none px-0.25 m-1 text-sm"
                    >
                        <li
                            v-for="icon in getIconsRef"
                            :key="icon"
                            @click="handleClick(icon)"
                            class="w-1/8 inline-flex items-center justify-center border border-solid box-border mr-1 mb-1 p-2 cursor-pointer border-gray-200 hover:dark:border-primary hover:border-primary dark:border-dark-100"
                        >
                            <span :class="`${prefix}${icon}`"></span>
                        </li>
                    </ul>
                    <el-empty v-else style="height: 180px" :image-size="60" />
                </el-scrollbar>
            </el-popover>
        </template>
    </el-input>
</template>
<script>
import { iconDefault } from "./../../build/icons"
import { useTransl } from 'core/locales/comLocale'
export default defineComponent({
    name: 'IconPicker',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        prefix: {
            type: String,
            default: 'i-',
        },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { t } = useTransl()
        const currentSelectRef = ref('')
        const searchRef = ref('')
        // popover虚拟触发绑定的的ref参数
        const buttonRef = ref('')
        // popover的ref参数
        const popoverRef = ref()

        const getIconsRef = computed(() => {
            if (!unref(searchRef)) {
                return iconDefault
            }

            return iconDefault.filter((i) => i.includes(unref(searchRef)))
        })
        function handleClick(icon) {
            currentSelectRef.value = icon
        }
        function handleClear() {
            currentSelectRef.value = ''
        }
        watchEffect(() => {
            currentSelectRef.value = props.modelValue
        })
        watch(
            () => unref(currentSelectRef),
            (v) => {
                emit('update:modelValue', v)
                emit('change', v)
            }
        )
        return {
            currentSelectRef,
            searchRef,
            buttonRef,
            popoverRef,
            getIconsRef,
            handleClick,
            handleClear,
            t,
        }
    },
})
</script>
<style lang="scss" scoped>
</style>