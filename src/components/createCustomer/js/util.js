export default {
    getValueFromEvent:(e)=>{
        return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
    }
}