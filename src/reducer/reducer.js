const initState={
    state:0
}
exports.reducer=(state = initState,action)=>{
    switch (action.type) {
        case 'journal':
            return {
                state: state.state+1
            };
        default:
            return state
    }
}
