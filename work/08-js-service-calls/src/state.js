const state = {
    nowWord:" ",
    nowName:"",
    isError:false,
    nowError:"",
};

state.getErrorStatus = function(){
    return state.isError;
};

state.setNewError = function(error){
    if (error !== 'auth-missing'){
        state.nowError = error;
        state.isError = true;
    }
};

state.clearError = function(){
    state.nowError = "";
    state.isError = false;
};

state.setName = function(username){
    state.nowName = username;
};

state.getName = function(){
    return state.nowName;
};

state.getWord = function(){
    return state.nowWord;
}

state.setWord = function(word){
    state.nowWord = word;
};

state.logout = function(){
    state.nowWord = " ";
    state.nowName = "";
    state.isError = false;
    state.nowError = "";

};

export default state;