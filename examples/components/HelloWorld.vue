<template>
    <div>
        <yx-checkbox-group v-model="checkList">
            <yx-checkbox label="复选框 A"></yx-checkbox>
            <yx-checkbox label="复选框 B"></yx-checkbox>
            <yx-checkbox label="复选框 C"></yx-checkbox>
            <yx-checkbox label="禁用" disabled></yx-checkbox>
            <yx-checkbox label="选中且禁用" disabled></yx-checkbox>
        </yx-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <yx-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</yx-checkbox
        >
        <div style="margin: 15px 0;"></div>
        <yx-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
        >
            <yx-checkbox v-for="city in cities" :label="city" :key="city">
                {{ city }}
            </yx-checkbox>
        </yx-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <yx-input
            type="text"
            placeholder="请输入内容"
            v-model="input"
            maxlength="10"
            show-word-limit
            disabled
        ></yx-input>
        <yx-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            maxlength="10"
            v-model="textarea"
            show-word-limit
            disabled
        ></yx-input>
        <yx-input
            placeholder="请输入内容"
            suffix-icon="yx-icon-date"
            v-model="input1"
        ></yx-input>
        <yx-input
            size="medium"
            placeholder="请输入内容"
            suffix-icon="yx-icon-date"
            v-model="input2"
        ></yx-input>
        <yx-input
            size="small"
            placeholder="请输入内容"
            suffix-icon="yx-icon-date"
            v-model="input3"
        ></yx-input>
        <yx-input
            size="mini"
            placeholder="请输入内容"
            suffix-icon="yx-icon-date"
            v-model="input4"
        ></yx-input>
        <yx-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea"
        ></yx-input>
        <div style="margin: 20px 0;"></div>
        <yx-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="textarea"
        ></yx-input>
        <yx-form>
            <yx-form-item>
                <yx-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="textarea"
                ></yx-input>
            </yx-form-item>
        </yx-form>
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    name: 'HelloWorld',

    data() {
        return {
            checkList: ['选中且禁用', '复选框 A'],
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            input: '123',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            textarea: '123',
        };
    },

    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.cities.length;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
.yx-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
